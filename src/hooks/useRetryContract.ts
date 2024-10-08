import { ethers } from "ethers";
import { useCallback } from "react";
import retry from "p-retry";
import PQueue from "p-queue";

const MethodPriority = {
    commitBid: 10,
    revealBid: 10,
    claimTimeoutPenalty: 100,
    surrender: 10,
};

const queue = new PQueue({
    concurrency: 1,
});

import { useTestflightContract } from "./useContract";
import {
    calculateGasMargin,
    getRandomProvider,
    TESTFLIGHT_CHAINID,
} from "@/utils/web3Utils";
import NonceManager from "@/utils/nonceManager";
import { getSCWallet } from "./useSCWallet";
import {
    useBurnerSkylabBidTacToeGameContract,
    useTestSkylabBidTacToeContract,
} from "./useBurnerContract";
import { getReason } from "@/utils/receipt";
import {
    topic0UserOpearationEvent,
    topic0UserOperationRevertReason,
    UserOperationiface,
} from "@/skyConstants/iface";
import { useChainId } from "wagmi";
import { createWalletClient, encodeFunctionData, http } from "viem";
import { getViemClients } from "@/utils/viem";
import { privateKeyToAccount } from "viem/accounts";
import { CHAINS } from "@/skyConstants/chains";

const nonceManager = new NonceManager();

export const wait = async (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
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
                clearQueue?: boolean;
            } = {},
        ) => {
            const {
                gasLimit,
                signer: overridsSigner,
                usePaymaster,
                clearQueue,
            } = overrides;

            if (clearQueue) {
                queue.clear();
            }

            const result = await queue.add(
                () => {
                    return retry(
                        async (tries) => {
                            if (usePaymaster) {
                                try {
                                    const provider = getViemClients({
                                        chainId: TESTFLIGHT_CHAINID,
                                    });
                                    const localSinger = overridsSigner;
                                    const { sCWSigner, sCWAddress } =
                                        await getSCWallet(
                                            localSinger.privateKey,
                                        );
                                    // @ts-ignore
                                    const data = encodeFunctionData({
                                        abi: contract.abi,
                                        functionName: method,
                                        args,
                                    });

                                    console.log(
                                        `tries ${tries} ${method} start`,
                                    );

                                    const hash =
                                        await sCWSigner.sendTransaction({
                                            from: sCWAddress as `0x${string}`,
                                            to: contract.address as `0x${string}`,
                                            data: data as `0x${string}`,
                                        });

                                    console.log(
                                        `tries ${tries} use paymaster receipt hash: ${hash}`,
                                    );

                                    const receipt = // @ts-ignore
                                        await provider.waitForTransactionReceipt(
                                            {
                                                hash,
                                            },
                                        );

                                    console.log(receipt);
                                    const operateLog = receipt.logs.find(
                                        (log: any) => {
                                            return (
                                                log.topics[0] ===
                                                topic0UserOpearationEvent
                                            );
                                        },
                                    );

                                    if (operateLog) {
                                        const operateData =
                                            UserOperationiface.parseLog({
                                                data: operateLog.data,
                                                topics: operateLog.topics,
                                            });

                                        const success =
                                            operateData.args.success;

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
                                                throw new Error(
                                                    "Transaction failed",
                                                );
                                            }
                                            const errorData =
                                                UserOperationiface.parseLog({
                                                    data: errorLog.data,
                                                    topics: errorLog.topics,
                                                });

                                            const revertReason =
                                                errorData.args.revertReason;
                                            console.log(revertReason, "");
                                            const revertBytes =
                                                ethers.utils.arrayify(
                                                    revertReason,
                                                );

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

                                    console.log(
                                        `tries ${tries} ${method} success`,
                                    );

                                    return receipt;
                                } catch (e) {
                                    console.log(
                                        `tries ${tries} write method ${method} error`,
                                        e,
                                    );

                                    return Promise.reject(e);
                                }
                            } else {
                                const provider = getRandomProvider(chainId);
                                console.log(`tries ${tries} ${method} start`);
                                const newSigner = overridsSigner
                                    ? overridsSigner
                                    : signer;

                                const account = privateKeyToAccount(newSigner);
                                const signerClient: any = createWalletClient({
                                    account,
                                    chain: CHAINS.find((item) => {
                                        return item.id === chainId;
                                    }),
                                    transport: http(),
                                });

                                const address = signerClient.account.address;

                                try {
                                    const publicClient = getViemClients({
                                        chainId,
                                    });

                                    const gas =
                                        // @ts-ignore
                                        await publicClient.estimateContractGas({
                                            address: contract.address,
                                            abi: contract.abi,
                                            functionName: method,
                                            account:
                                                signerClient.account.address,
                                            args: args,
                                        });

                                    const nonce = await nonceManager.getNonce(
                                        provider,
                                        address,
                                    );

                                    const gas1 =
                                        gasLimit && gasLimit > Number(gas)
                                            ? gasLimit
                                            : calculateGasMargin(
                                                  Number(gas),
                                              ).toNumber();

                                    const hash =
                                        await signerClient.writeContract({
                                            address: contract.address,
                                            abi: contract.abi,
                                            functionName: method,
                                            args: args,
                                            nonce: nonce,
                                            gas: gas1,
                                            gasLimit: gas1,
                                        });

                                    const receipt = // @ts-ignore
                                        await publicClient.waitForTransactionReceipt(
                                            {
                                                hash,
                                            },
                                        );

                                    console.log(receipt, "receipt");

                                    if (receipt.status !== "success") {
                                        const reason = await getReason(
                                            provider,
                                            hash,
                                        );

                                        if (reason) {
                                            throw new Error(reason);
                                        }

                                        throw new Error("Transaction failed");
                                    }
                                    console.log(
                                        `tries ${tries} ${method} success`,
                                    );

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
                {
                    priority: MethodPriority[method] || 1,
                },
            );
            return result;
        },
        [chainId, contract, signer],
    );
};

export const getPayMasterBurnerRetryContract = (contract: any, signer: any) => {
    return async (method: string, args: any[], overrides?: any) => {
        if (overrides?.clearQueue) {
            queue.clear();
        }
        const result = await queue.add(
            () => {
                return retry(
                    async (tries) => {
                        try {
                            const provider = getViemClients({
                                chainId: TESTFLIGHT_CHAINID,
                            });
                            const localSinger = overrides?.signer
                                ? overrides?.signer
                                : signer;

                            const { sCWSigner, sCWAddress } = await getSCWallet(
                                localSinger.privateKey,
                            );
                            // @ts-ignore
                            const data = encodeFunctionData({
                                abi: contract.abi,
                                functionName: method,
                                args,
                            });

                            console.log(`tries ${tries} ${method} start`);

                            const hash = await sCWSigner.sendTransaction({
                                from: sCWAddress as `0x${string}`,
                                to: contract.address as `0x${string}`,
                                data: data as `0x${string}`,
                            });

                            console.log(
                                `tries ${tries} use paymaster receipt hash: ${hash}`,
                            );

                            const receipt = // @ts-ignore
                                await provider.waitForTransactionReceipt({
                                    hash,
                                });

                            console.log(receipt);
                            const operateLog = receipt.logs.find((log: any) => {
                                return (
                                    log.topics[0] === topic0UserOpearationEvent
                                );
                            });

                            if (operateLog) {
                                const operateData = UserOperationiface.parseLog(
                                    {
                                        data: operateLog.data,
                                        topics: operateLog.topics,
                                    },
                                );

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
                                    const errorData =
                                        UserOperationiface.parseLog({
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
                        } catch (e) {
                            console.log(
                                `tries ${tries} write method ${method} error`,
                                e,
                            );

                            return Promise.reject(e);
                        }
                    },
                    {
                        retries: 2,
                    },
                );
            },
            {
                priority: MethodPriority[method] || 1,
            },
        );
        return result;
    };
};

export const useTestflightRetryPaymaster = (signer: any) => {
    const contract = useTestflightContract();
    const contractWrite = getPayMasterBurnerRetryContract(contract, signer);
    return contractWrite;
};

export const useBttFactoryRetryPaymaster = (signer: any) => {
    const contract = useTestSkylabBidTacToeContract();
    const contractWrite = getPayMasterBurnerRetryContract(contract, signer);
    return contractWrite;
};

export const useBttGameRetryPaymaster = (address: string, signer: any) => {
    const contract = useBurnerSkylabBidTacToeGameContract(address);
    const contractWrite = getPayMasterBurnerRetryContract(contract, signer);
    return contractWrite;
};

export const useBttGameRetry = (address: string) => {
    const contract = useBurnerSkylabBidTacToeGameContract(address);
    const tacToeGameRetryWrite = useBurnerRetryContract(contract);
    return tacToeGameRetryWrite;
};

export default null;
