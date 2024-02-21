import { ethers } from "ethers";
import { useCallback } from "react";
import { useSkylabBidTacToeContract } from "./useContract";
import { ChainId, SUPPORTED_NETWORKS } from "@/utils/web3Utils";
import useSkyToast from "./useSkyToast";
import { useAccount, useChainId } from "wagmi";
import { useEthersProvider } from "./useWagmiToEthers";
import { waitForTransaction } from "@/utils/web3Network";
import { getViemClients } from "@/utils/viem";

export enum BalanceState {
    ACCOUNT_LACK,
    LACK,
    ENOUTH,
}

export enum ApproveGameState {
    APPROVED,
    NOT_APPROVED,
}

const balanceInfo = {
    [ChainId.BASE]: {
        low: "0.0018",
        high: "0.002",
        need: "0.0021",
    },
    [ChainId.POLYGON]: {
        low: "1",
        high: "1",
        need: "1.01",
    },
    [ChainId.MUMBAI]: {
        low: "0.18",
        high: "0.2",
        need: "0.21",
    },
    [ChainId.SEPOLIA]: {
        low: "0.018",
        high: "0.02",
        need: "0.021",
    },
};

export const useCheckBurnerBalanceAndApprove = () => {
    const toast = useSkyToast();
    const { address } = useAccount();
    const library = useEthersProvider();
    const chainId = useChainId();
    const skylabBidTacToeContract = useSkylabBidTacToeContract();

    const approveForBidTacToeGame = useCallback(
        async (
            aviationAddress: string,
            tokenId: number,
            burnerAddress: string,
            needTransfer: boolean,
        ) => {
            if (
                !address ||
                !skylabBidTacToeContract ||
                !tokenId ||
                !burnerAddress
            ) {
                return;
            }

            console.log(
                needTransfer
                    ? "start approveForGame and transferGas"
                    : "start approveForGame",
            );

            const approveResult =
                await skylabBidTacToeContract.write.approveForGame(
                    [burnerAddress, tokenId, aviationAddress],
                    {
                        value: needTransfer
                            ? ethers.utils.parseEther(balanceInfo[chainId].high)
                            : 0,
                        gasLimit: 1000000,
                    },
                );

            const publicClient = getViemClients({
                chainId,
            });

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash: approveResult,
            });

            console.log(
                needTransfer
                    ? "success approveForGame and transferGas"
                    : "success approveForGame",
            );
        },
        [address, skylabBidTacToeContract],
    );

    const getTacToeBalanceState = useCallback(
        async (burnerAddress: string) => {
            if (!library || !burnerAddress) {
                return;
            }
            const burnerBalance = await library.getBalance(burnerAddress);
            if (
                burnerBalance.lt(
                    ethers.utils.parseEther(balanceInfo[chainId].low),
                )
            ) {
                const balance = await library.getBalance(address);
                if (
                    balance.lt(
                        ethers.utils.parseEther(balanceInfo[chainId].need),
                    )
                ) {
                    return BalanceState.ACCOUNT_LACK;
                }
                return BalanceState.LACK;
            }
            return BalanceState.ENOUTH;
        },
        [library, chainId, address],
    );

    const getApproveBitTacToeGameState = useCallback(
        async (
            aviationAddress: string,
            tokenId: number,
            operateAddress: string,
        ) => {
            if (
                !tokenId ||
                !operateAddress ||
                !skylabBidTacToeContract ||
                !library
            ) {
                return;
            }

            const isApprovedForGame =
                await skylabBidTacToeContract.read.isApprovedForGame(
                    [tokenId, aviationAddress],
                    {
                        account: operateAddress as any,
                    },
                );

            return isApprovedForGame
                ? ApproveGameState.APPROVED
                : ApproveGameState.NOT_APPROVED;
        },
        [skylabBidTacToeContract, library],
    );

    const handleCheckBurnerBidTacToe = useCallback(
        async (
            aviationAddress: string,
            tokenId: number,
            operateAddress: string,
            needTransferGas: boolean = true,
        ) => {
            const balanceState = await getTacToeBalanceState(operateAddress);
            if (balanceState === BalanceState.ACCOUNT_LACK) {
                toast(
                    `You do not have enough balance, have at least ${balanceInfo[chainId].high} ${SUPPORTED_NETWORKS[chainId].nativeCurrency.name} in your wallet and refresh`,
                    true,
                );

                return;
            }

            const approveState = await getApproveBitTacToeGameState(
                aviationAddress,
                tokenId,
                operateAddress,
            );

            if (approveState === ApproveGameState.NOT_APPROVED) {
                await approveForBidTacToeGame(
                    aviationAddress,
                    tokenId,
                    operateAddress,
                    needTransferGas && balanceState === BalanceState.LACK,
                );
            }
        },
        [
            getTacToeBalanceState,
            getApproveBitTacToeGameState,
            approveForBidTacToeGame,
        ],
    );

    return handleCheckBurnerBidTacToe;
};

export default null;
