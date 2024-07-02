import { Box } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getPlaneGameSigner } from "@/hooks/useSigner";
import Match from "@/components/TacToe/Match";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { useChainId } from "wagmi";
import { getViemClients } from "@/utils/viem";
import { mercuryJarTournamentAddress } from "@/hooks/useContract";
import Nest from "@/components/Nest";
import { Info, UserMarkType } from "@/skyConstants/bttGameTypes";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { CHAINS } from "@/skyConstants/chains";

const GameContext = createContext<{
    tokenId: number;
    myInfo: Info;
    opInfo: Info;
    avaitionAddress: string;
    handleGetGas: () => void;
}>(null);
export const useGameContext = () => useContext(GameContext);

const MatchPage = () => {
    const chainId = useChainId();

    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [tokenId] = useState<number>(params.tokenId);
    const avaitionAddress = mercuryJarTournamentAddress[chainId];
    const [myInfo, setMyInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        point: 0,
        img: "",
        mark: UserMarkType.Empty,
    });
    const [opInfo, setOpInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        point: 0,
        img: "",
        mark: UserMarkType.Empty,
    });

    const planeAccount = getPlaneGameSigner(tokenId);

    const handleGetGas = async () => {
        console.log("start transfer gas");

        const publicClient: any = getViemClients({ chainId });
        const balance = await publicClient.getBalance({
            address: planeAccount.address,
        });
        const gasPrice = await publicClient.getGasPrice();
        const fasterGasPrice = (gasPrice * BigInt(110)) / BigInt(100);
        const gasFee = fasterGasPrice * BigInt(21000);
        const l1Fees = BigInt(100000000000000);

        if (balance - l1Fees < gasFee) {
            return;
        }

        const value = balance - gasFee - l1Fees;
        const account = privateKeyToAccount(
            planeAccount.privateKey as `0x${string}`,
        );
        const signerClient: any = createWalletClient({
            account,
            chain: CHAINS.find((item) => {
                return item.id === chainId;
            }),
            transport: http(),
        });
        const transferResult = await signerClient.sendTransaction({
            to: account,
            value: value,
            gasLimit: 21000,
            gasPrice: fasterGasPrice,
        });

        console.log("transfer remain balance", transferResult);
    };

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    height: "100%",
                    fontFamily: "Quantico",
                    width: "100%",
                }}
            >
                <GameContext.Provider
                    value={{
                        myInfo,
                        opInfo,
                        tokenId,
                        avaitionAddress,
                        handleGetGas: handleGetGas,
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                        }}
                    >
                        <Match
                            onChangeInfo={(position, info) => {
                                if (position === "my") {
                                    setMyInfo(info);
                                    return;
                                }
                                if (position === "op") {
                                    setOpInfo(info);
                                    return;
                                }
                            }}
                        ></Match>
                    </Box>
                </GameContext.Provider>
            </Box>
            <Nest />
        </Box>
    );
};

export default MatchPage;
