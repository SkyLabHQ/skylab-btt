import { ethers } from "ethers";
import { useCallback } from "react";
import retry from "p-retry";
import PQueue from "p-queue";

const MethodPriority = {
    commitBid: 10,
    revealBid: 10,
    setMessage: 0,
    setEmote: 0,
    claimTimeoutPenalty: 100,
    surrender: 10,
};

const queue = new PQueue({
    concurrency: 1,
});

import {
    useSkylabBidTacToeContract,
    useTestflightContract,
} from "./useContract";
import {
    calculateGasMargin,
    getRandomProvider,
    TESTFLIGHT_CHAINID,
} from "@/utils/web3Utils";
import { getTestflightSigner, useTacToeSigner } from "./useSigner";
import NonceManager from "@/utils/nonceManager";
import { getSCWallet } from "./useSCWallet";
import {
    useBurnerMercuryBTTPrivateLobbyContract,
    useBurnerSkylabBidTacToeContract,
    useBurnerSkylabBidTacToeGameContract,
} from "./useBurnerContract";
import { getReason } from "@/utils/receipt";
import {
    topic0UserOpearationEvent,
    topic0UserOperationRevertReason,
    UserOperationiface,
} from "@/skyConstants/iface";
import { useChainId } from "wagmi";
import { encodeFunctionData } from "viem";
import { getViemClients } from "@/utils/viem";

const nonceManager = new NonceManager();

export const wait = async (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const getBurnerRetryContract = ({
    contract,
    signer,
    chainId,
}: {
    contract: any;
    signer?: any;
    chainId: number;
}) => {
    return async (
        method: string,
        args: any[],
        overrides: {
            gasLimit?: number;
            signer?: any;
            usePaymaster?: boolean;
        } = {},
    ) => {
        const { gasLimit, signer: overridsSigner, usePaymaster } = overrides;

        return retry(
            async (tries) => {
                if (usePaymaster) {
                    const provider = getViemClients({
                        chainId: TESTFLIGHT_CHAINID,
                    });
                    const localSinger = overridsSigner
                        ? overridsSigner
                        : getTestflightSigner(TESTFLIGHT_CHAINID);
                    const { sCWSigner, sCWAddress } = await getSCWallet(
                        localSinger.privateKey,
                    );
                    const hash = await queue.add(
                        async () => {
                            // @ts-ignore
                            const data = encodeFunctionData({
                                abi: contract.abi,
                                functionName: method,
                                args,
                            });

                            console.log(`tries ${tries} ${method} start`);
                            return await sCWSigner.sendTransaction({
                                from: sCWAddress as `0x${string}`,
                                to: contract.address as `0x${string}`,
                                data: data as `0x${string}`,
                            });
                        },
                        {
                            priority: MethodPriority[method] || 1,
                        },
                    );

                    console.log(
                        `tries ${tries} use paymaster receipt hash: ${hash}`,
                    );

                    const receipt = // @ts-ignore
                        await provider.waitForTransactionReceipt({ hash });

                    console.log(receipt);
                    const operateLog = receipt.logs.find((log: any) => {
                        return log.topics[0] === topic0UserOpearationEvent;
                    });

                    if (operateLog) {
                        const operateData = UserOperationiface.parseLog({
                            data: operateLog.data,
                            topics: operateLog.topics,
                        });

                        const success = operateData.args.success;

                        if (!success) {
                            const errorLog = receipt.logs.find((log: any) => {
                                return (
                                    log.topics[0] ===
                                    topic0UserOperationRevertReason
                                );
                            });

                            if (!errorLog) {
                                throw new Error("Transaction failed");
                            }
                            const errorData = UserOperationiface.parseLog({
                                data: errorLog.data,
                                topics: errorLog.topics,
                            });

                            const revertReason = errorData.args.revertReason;
                            console.log(revertReason, "");
                            const revertBytes =
                                ethers.utils.arrayify(revertReason);

                            // 解析错误消息
                            const errorMessage =
                                ethers.utils.defaultAbiCoder.decode(
                                    ["string"],
                                    ethers.utils.hexDataSlice(revertBytes, 4),
                                )[0];

                            throw new Error(errorMessage);
                        }
                    }

                    console.log(`tries ${tries} ${method} success`);

                    return receipt;
                } else {
                    const provider = getRandomProvider(chainId);
                    console.log(`tries ${tries} ${method} start`);
                    const newSigner = overridsSigner ? overridsSigner : signer;

                    const address = await newSigner.account.address;

                    try {
                        const publicClient = getViemClients({
                            chainId,
                        });

                        // @ts-ignore
                        const gas = await publicClient.estimateContractGas({
                            address: contract.address,
                            abi: contract.abi,
                            functionName: method,
                            account: newSigner.account.address,
                            args: args,
                        });

                        const nonce = await nonceManager.getNonce(
                            provider,
                            address,
                        );

                        const hash = await newSigner.writeContract({
                            address: contract.address,
                            abi: contract.abi,
                            functionName: method,
                            args: args,
                            nonce: nonce,
                            gasLimit:
                                gasLimit && gasLimit > Number(gas)
                                    ? gasLimit
                                    : calculateGasMargin(Number(gas)),
                        });

                        const receipt = // @ts-ignore
                            await publicClient.waitForTransactionReceipt({
                                hash,
                            });

                        console.log(receipt, "receipt");

                        if (receipt.status === 0) {
                            const reason = await getReason(provider, hash);

                            if (reason) {
                                throw new Error(reason);
                            }

                            throw new Error("Transaction failed");
                        }
                        console.log(`tries ${tries} ${method} success`);

                        return receipt;
                    } catch (e) {
                        console.log(
                            `tries ${tries} write method ${method} error`,
                            e,
                        );
                        nonceManager.resetNonce(address);
                        return Promise.reject(e);
                    }
                }
            },
            {
                retries: 1,
            },
        );
    };
};

export const useBurnerRetryContract = (contract: any, signer?: any) => {
    const chainId = useChainId();
    return useCallback(
        async (
            method: string,
            args: any[],
            overrides: {
                gasLimit?: number;
                signer?: any;
                usePaymaster?: boolean;
            } = {},
        ) => {
            const {
                gasLimit,
                signer: overridsSigner,
                usePaymaster,
            } = overrides;

            return retry(
                async (tries) => {
                    if (usePaymaster) {
                        const provider = getViemClients({
                            chainId: TESTFLIGHT_CHAINID,
                        });
                        const localSinger = overridsSigner
                            ? overridsSigner
                            : getTestflightSigner(TESTFLIGHT_CHAINID);
                        const { sCWSigner, sCWAddress } = await getSCWallet(
                            localSinger.privateKey,
                        );
                        const hash = await queue.add(
                            async () => {
                                // @ts-ignore
                                const data = encodeFunctionData({
                                    abi: contract.abi,
                                    functionName: method,
                                    args,
                                });

                                console.log(`tries ${tries} ${method} start`);
                                return await sCWSigner.sendTransaction({
                                    from: sCWAddress as `0x${string}`,
                                    to: contract.address as `0x${string}`,
                                    data: data as `0x${string}`,
                                });
                            },
                            {
                                priority: MethodPriority[method] || 1,
                            },
                        );

                        console.log(
                            `tries ${tries} use paymaster receipt hash: ${hash}`,
                        );

                        const receipt = // @ts-ignore
                            await provider.waitForTransactionReceipt({ hash });

                        console.log(receipt);
                        const operateLog = receipt.logs.find((log: any) => {
                            return log.topics[0] === topic0UserOpearationEvent;
                        });

                        if (operateLog) {
                            const operateData = UserOperationiface.parseLog({
                                data: operateLog.data,
                                topics: operateLog.topics,
                            });

                            const success = operateData.args.success;

                            if (!success) {
                                const errorLog = receipt.logs.find(
                                    (log: any) => {
                                        return (
                                            log.topics[0] ===
                                            topic0UserOperationRevertReason
                                        );
                                    },
                                );

                                if (!errorLog) {
                                    throw new Error("Transaction failed");
                                }
                                const errorData = UserOperationiface.parseLog({
                                    data: errorLog.data,
                                    topics: errorLog.topics,
                                });

                                const revertReason =
                                    errorData.args.revertReason;
                                console.log(revertReason, "");
                                const revertBytes =
                                    ethers.utils.arrayify(revertReason);

                                // 解析错误消息
                                const errorMessage =
                                    ethers.utils.defaultAbiCoder.decode(
                                        ["string"],
                                        ethers.utils.hexDataSlice(
                                            revertBytes,
                                            4,
                                        ),
                                    )[0];

                                throw new Error(errorMessage);
                            }
                        }

                        console.log(`tries ${tries} ${method} success`);

                        return receipt;
                    } else {
                        const provider = getRandomProvider(chainId);
                        console.log(`tries ${tries} ${method} start`);
                        const newSigner = overridsSigner
                            ? overridsSigner
                            : signer;

                        const address = await newSigner.account.address;

                        try {
                            const publicClient = getViemClients({
                                chainId,
                            });

                            // @ts-ignore
                            const gas = await publicClient.estimateContractGas({
                                address: contract.address,
                                abi: contract.abi,
                                functionName: method,
                                account: newSigner.account.address,
                                args: args,
                            });

                            const nonce = await nonceManager.getNonce(
                                provider,
                                address,
                            );

                            const hash = await newSigner.writeContract({
                                address: contract.address,
                                abi: contract.abi,
                                functionName: method,
                                args: args,
                                nonce: nonce,
                                gas:
                                    gasLimit && gasLimit > Number(gas)
                                        ? gasLimit
                                        : calculateGasMargin(Number(gas)),
                            });

                            const receipt = // @ts-ignore
                                await publicClient.waitForTransactionReceipt({
                                    hash,
                                });

                            console.log(receipt, "receipt");

                            if (receipt.status === 0) {
                                const reason = await getReason(provider, hash);

                                if (reason) {
                                    throw new Error(reason);
                                }

                                throw new Error("Transaction failed");
                            }
                            console.log(`tries ${tries} ${method} success`);

                            return receipt;
                        } catch (e) {
                            console.log(
                                `tries ${tries} write method ${method} error`,
                                e,
                            );
                            nonceManager.resetNonce(address);
                            return Promise.reject(e);
                        }
                    }
                },
                {
                    retries: 1,
                },
            );
        },
        [chainId, contract, signer],
    );
};

export const useBidTacToeFactoryRetry = (
    tokenId?: number,
    propTestflight: boolean = false,
) => {
    const [signer] = useTacToeSigner(tokenId, propTestflight);
    const contract = useSkylabBidTacToeContract();
    const tacToeFactoryRetryWrite = useBurnerRetryContract(contract, signer);

    return tacToeFactoryRetryWrite;
};

export const useTestflightRetryContract = () => {
    const contract = useTestflightContract();
    const contractWrite = useBurnerRetryContract(contract);
    return contractWrite;
};

export const useBttFactoryRetry = (testflight: boolean, signer?: any) => {
    const contract = useBurnerSkylabBidTacToeContract(testflight);
    const contractWrite = useBurnerRetryContract(contract, signer);
    return contractWrite;
};

export const useBttGameRetry = (address: string, tokenId?: number) => {
    const [signer] = useTacToeSigner(tokenId);
    const contract = useBurnerSkylabBidTacToeGameContract(address);
    const tacToeGameRetryWrite = useBurnerRetryContract(contract, signer);
    return tacToeGameRetryWrite;
};

export const useBttPrivateLobbyContract = (address: string, signer?: any) => {
    const contract = useBurnerMercuryBTTPrivateLobbyContract(address);
    const tacToeGameRetryWrite = useBurnerRetryContract(contract, signer);
    if (!contract) {
        return null;
    }
    return tacToeGameRetryWrite;
};

export default null;
