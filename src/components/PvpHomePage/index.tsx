import { useState } from "react";
import { Box, Flex, useMediaQuery, Image, Text } from "@chakra-ui/react";
import LineBg from "@/assets/line.png";
import ButtonBg from "@/assets/bt-bg.png";
import { useBttFactoryRetryPaymaster } from "@/hooks/useRetryContract";
import { useNavigate } from "react-router-dom";
import {
    useMultiProvider,
    useMultiTestSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { ethers, utils as ethersUtils } from "ethers";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useSCWallet } from "@/hooks/useSCWallet";
import { useInitData } from "@tma.js/sdk-react";
import { bindBurner } from "@/api";
import BttIcon from "@/assets/btt-icon.png";
import SoloIcon from "./assets/solo-icon.svg";
import { bttFactoryIface } from "@/skyConstants/iface";

const PlayButtonGroup = ({
    onPlayTournament,
}: {
    onPlayTournament: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                marginTop: "10px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Quantico",
                }}
            >
                <Flex
                    sx={{
                        width: "100%",
                    }}
                    align={"center"}
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                    <Box
                        sx={{
                            margin: "0 20px",
                            fontWeight: 700,
                            fontSize: isPc ? "30px" : "16px",
                            textAlign: "center",
                            color: "#FDDC2D",
                        }}
                    >
                        <Flex align={"center"}>
                            <Text>1</Text>
                            <Image
                                src={SoloIcon}
                                sx={{
                                    margin: "0 4px",
                                }}
                            ></Image>
                            <Text>1</Text>
                        </Flex>
                        <Text>GAME</Text>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                </Flex>
                <Flex
                    align={"center"}
                    onClick={() => {
                        onPlayTournament();
                    }}
                    alignItems={"center"}
                    justify={"center"}
                    sx={{
                        width: "194px",
                        height: "60px",
                        marginTop: isPc ? "36px" : "20px",
                        cursor: "pointer",
                        background: `url(${ButtonBg})`,
                        backgroundSize: "100% 100%",
                    }}
                >
                    <Text
                        className="play-button-text"
                        sx={{
                            color: "#fff",
                        }}
                    >
                        Start Game
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

const PvpHomePage = () => {
    const toast = useSkyToast();
    const navigate = useNavigate();

    const initData = useInitData();
    const { openLoading, closeLoading, isLoading } = useSubmitRequest();
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const multiTestSkylabBidTacToeFactoryContract =
        useMultiTestSkylabBidTacToeFactoryContract();
    const [privateKey] = useState(ethers.Wallet.createRandom().privateKey);

    const { sCWAddress: pvpAddress } = useSCWallet(privateKey);

    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const handlePlay1V1 = async () => {
        if (!pvpAddress) return;
        try {
            openLoading();
            const password = Math.floor(Math.random() * 1000000);
            localStorage.setItem("password", String(password));
            const encodedPassword = ethersUtils.defaultAbiCoder.encode(
                ["uint256"],
                [password],
            );
            const hashedPassword = ethersUtils.keccak256(encodedPassword);
            const receipt = await bttFactoryRetryPaymaster("createPvPRoom", [
                [3, 3, 3, 100, 1, 0, false, 12 * 60 * 60],
                hashedPassword,
            ]);

            const startPvpGameTopic0 =
                bttFactoryIface.getEventTopic("StartBotGame");

            const [gameAddress] = await multiProvider.all([
                multiTestSkylabBidTacToeFactoryContract.gamePerPlayer(
                    pvpAddress,
                ),
            ]);

            await bindBurner({
                user: initData.user,
                burner: pvpAddress,
            });

            const pvpPrivateKeys = localStorage.getItem("pvpPrivateKeys")
                ? JSON.parse(localStorage.getItem("pvpPrivateKeys"))
                : {};
            pvpPrivateKeys[gameAddress] = privateKey;
            localStorage.setItem(
                "pvpPrivateKeys",
                JSON.stringify(pvpPrivateKeys),
            );

            const pvpPasswords = localStorage.getItem("pvpPasswords")
                ? JSON.parse(localStorage.getItem("pvpPasswords"))
                : {};
            pvpPasswords[gameAddress] = password;
            localStorage.setItem("pvpPasswords", JSON.stringify(pvpPasswords));
            navigate(`/pvp/match?gameAddress=${gameAddress}`);
            closeLoading();
        } catch (e) {
            toast(handleError(e));
            closeLoading();
        }
    };

    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            justify={"center"}
            sx={{
                height: "100%",
                fontFamily: "Orbitron",
            }}
        >
            <Image
                src={BttIcon}
                sx={{
                    width: "120px",
                }}
            ></Image>
            <Text
                sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    marginTop: "10px",
                }}
            >
                Bid Tac Toe
            </Text>
            <PlayButtonGroup onPlayTournament={handlePlay1V1}></PlayButtonGroup>
        </Flex>
    );
};

export default PvpHomePage;
