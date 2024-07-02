import { Box } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { useTacToeSigner } from "@/hooks/useSigner";
import Match from "@/components/TacToe/Match";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { useChainId } from "wagmi";
import { getViemClients } from "@/utils/viem";
import { mercuryJarTournamentAddress } from "@/hooks/useContract";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import Nest from "@/components/Nest";
import { Info, UserMarkType } from "@/skyConstants/bttGameTypes";

const GameContext = createContext<{
    realChainId: number;
    tokenId: number;
    myInfo: Info;
    opInfo: Info;
    avaitionAddress: string;
    mileages: {
        winMileage: number;
        loseMileage: number;
    };
    points: {
        winPoint: number;
        losePoint: number;
    };
    handleGetGas: () => void;
}>(null);
export const useGameContext = () => useContext(GameContext);

const MatchPage = () => {
    const chainId = useChainId();
    const { address: account } = usePrivyAccounts();

    const [mileages, setMileages] = useState<{
        winMileage: number;
        loseMileage: number;
    }>({
        winMileage: 0,
        loseMileage: 0,
    });

    const [points, setPoints] = useState<{
        winPoint: number;
        losePoint: number;
    }>({
        winPoint: 0,
        losePoint: 0,
    });

    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [tokenId] = useState<number>(params.tokenId);
    const realChainId = chainId;
    const avaitionAddress = mercuryJarTournamentAddress[realChainId];
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
    const [burnerWallet] = useTacToeSigner(tokenId);

    const handleGetGas = async () => {
        console.log("start transfer gas");

        const publicClient: any = getViemClients({ chainId: realChainId });
        const balance = await publicClient.getBalance({
            address: burnerWallet.account.address,
        });
        const gasPrice = await publicClient.getGasPrice();
        const fasterGasPrice = (gasPrice * BigInt(110)) / BigInt(100);
        const gasFee = fasterGasPrice * BigInt(21000);
        const l1Fees = BigInt(100000000000000);

        if (balance - l1Fees < gasFee) {
            return;
        }

        const value = balance - gasFee - l1Fees;
        const transferResult = await burnerWallet.sendTransaction({
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
                        realChainId,
                        myInfo,
                        opInfo,
                        tokenId,
                        mileages,
                        points,
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
                            onChangeMileage={(winMileage, loseMileage) => {
                                setMileages({
                                    winMileage,
                                    loseMileage,
                                });
                            }}
                            onChangePoint={(winPoint, losePoint) => {
                                setPoints({
                                    winPoint,
                                    losePoint,
                                });
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
