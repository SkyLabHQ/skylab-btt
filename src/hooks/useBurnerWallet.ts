import { ethers } from "ethers";
import { useCallback } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import { getSigner, useSkylabBidTacToeContract } from "./useContract";
import { ChainId, SUPPORTED_NETWORKS } from "@/utils/web3Utils";
import useSkyToast from "./useSkyToast";

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
    [ChainId.BASEGOERLI]: {
        low: "0.018",
        high: "0.02",
        need: "0.021",
    },
};

export const useCheckBurnerBalanceAndApprove = () => {
    const toast = useSkyToast();
    const { account, chainId, library } = useActiveWeb3React();
    const skylabBidTacToeContract = useSkylabBidTacToeContract();

    const approveForBidTacToeGame = useCallback(
        async (
            aviationAddress: string,
            tokenId: number,
            burnerAddress: string,
            needTransfer: boolean,
        ) => {
            if (
                !account ||
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

            const approveResult = await skylabBidTacToeContract.approveForGame(
                burnerAddress,
                tokenId,
                aviationAddress,
                {
                    value: needTransfer
                        ? ethers.utils.parseEther(balanceInfo[chainId].high)
                        : 0,
                    gasLimit: 1000000,
                },
            );
            await approveResult.wait();
            console.log(
                needTransfer
                    ? "success approveForGame and transferGas"
                    : "success approveForGame",
            );
        },
        [account, skylabBidTacToeContract],
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
                const balance = await library.getBalance(account);
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
        [library, chainId],
    );

    const transferTacToeGas = useCallback(
        async (burnerAddress: string) => {
            if (!library || !account || !burnerAddress) {
                return;
            }
            toast("Confirm transaction in MetaMask to proceed");
            const singer = getSigner(library, account);
            const transferResult = await singer.sendTransaction({
                to: burnerAddress,
                value: ethers.utils.parseEther(balanceInfo[chainId].high),
            });
            await transferResult.wait();
        },
        [library, account, chainId],
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

            const voidSigner = new ethers.VoidSigner(operateAddress, library);
            const isApprovedForGame = await skylabBidTacToeContract
                .connect(voidSigner)
                .isApprovedForGame(tokenId, aviationAddress);

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
            transferTacToeGas,
            getApproveBitTacToeGameState,
            approveForBidTacToeGame,
        ],
    );

    return handleCheckBurnerBidTacToe;
};

export const useBurnerBidTacToeContract = (chainId: number) => {};

export default null;
