import { Contract, ethers, Wallet } from "ethers";
import { useCallback } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
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
import { waitForTransaction } from "@/utils/web3Network";
import { getSCWallet } from "./useSCWallet";
import {
    useBurnerSkylabBidTacToeContract,
    useBurnerSkylabBidTacToeGameContract,
} from "./useBurnerContract";
import { getReason } from "@/utils/receipt";
import {
    topic0UserOpearationEvent,
    topic0UserOperationRevertReason,
    UserOperationiface,
} from "@/skyConstants/iface";

const nonceManager = new NonceManager();

export const wait = async (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
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

export const useBurnerRetryContract = (contract: Contract, signer?: Wallet) => {
    const { chainId } = useActiveWeb3React();
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
                        const provider = getRandomProvider(TESTFLIGHT_CHAINID);
                        const localSinger =
                            getTestflightSigner(TESTFLIGHT_CHAINID);
                        const { sCWSigner, sCWAddress } = await getSCWallet(
                            localSinger.privateKey,
                        );
                        const hash = await queue.add(
                            async () => {
                                console.log(`tries ${tries} ${method} start`);
                                return await sCWSigner.sendTransaction({
                                    from: sCWAddress as `0x${string}`,
                                    to: contract.address as `0x${string}`,
                                    data: contract.interface.encodeFunctionData(
                                        method,
                                        args,
                                    ) as `0x${string}`,
                                });
                            },
                            {
                                priority: MethodPriority[method] || 1,
                            },
                        );

                        console.log(
                            `tries ${tries} use paymaster receipt hash: ${hash}`,
                        );

                        const receipt = await waitForTransaction(
                            provider,
                            hash,
                        );

                        console.log(receipt);
                        const operateLog = receipt.logs.find((log) => {
                            return log.topics[0] === topic0UserOpearationEvent;
                        });

                        if (operateLog) {
                            const operateData = UserOperationiface.parseLog({
                                data: operateLog.data,
                                topics: operateLog.topics,
                            });

                            const success = operateData.args.success;

                            if (!success) {
                                const errorLog = receipt.logs.find((log) => {
                                    return (
                                        log.topics[0] ===
                                        topic0UserOperationRevertReason
                                    );
                                });

                                console.log(errorLog, "errorLog");

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

                        const address = await newSigner.getAddress();

                        let res;
                        try {
                            const gasPrice = await provider.getGasPrice();

                            const nonce = await nonceManager.getNonce(
                                provider,
                                address,
                            );
                            const gas = await contract
                                .connect(newSigner)
                                .estimateGas[method](...args);

                            res = await contract
                                .connect(newSigner)
                                [method](...args, {
                                    nonce,
                                    gasPrice: gasPrice.mul(120).div(100),
                                    gasLimit:
                                        gasLimit && gasLimit > gas.toNumber()
                                            ? gasLimit
                                            : calculateGasMargin(gas),
                                });

                            const receipt = await waitForTransaction(
                                provider,
                                res.hash,
                            );

                            console.log(receipt, "receipt");

                            if (receipt.status === 0) {
                                const reason = await getReason(
                                    provider,
                                    res.hash,
                                );

                                if (reason) {
                                    throw new Error(reason);
                                }

                                throw new Error("Transaction failed");
                            }
                            console.log(`tries ${tries} ${method} success`);

                            return res;
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

export const useBttFactoryRetry = (testflight: boolean, signer?: any) => {
    const contract = useBurnerSkylabBidTacToeContract(testflight);
    const contractWrite = useBurnerRetryContract(contract, signer);
    return contractWrite;
};

export const useBttGameRetry = (address: string, tokenId?: number) => {
    const [signer] = useTacToeSigner(tokenId);
    const contract = useBurnerSkylabBidTacToeGameContract(address);
    const tacToeGameRetryWrite = useBurnerRetryContract(contract, signer);

    if (!signer) {
        return null;
    }

    return tacToeGameRetryWrite;
};

export default null;
