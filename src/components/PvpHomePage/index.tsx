import React, { useEffect } from "react";
import { Box, Flex, useMediaQuery, Image, Text } from "@chakra-ui/react";
import LineBg from "@/assets/line.png";
import SoloIcon from "./assets/solo-icon.png";
import ButtonBg from "@/assets/bt-bg.png";
import { useBttFactoryRetryPaymaster } from "@/hooks/useRetryContract";
import { useNavigate } from "react-router-dom";
import {
    useMultiProvider,
    useMultiTestSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { ZERO_DATA } from "@/skyConstants";
import { utils as ethersUtils } from "ethers";
import { usePvpInfo } from "@/contexts/PvpContext";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";

const PlayButtonGroup = ({
    onPlayTournament,
}: {
    onPlayTournament: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Quantico",
                    "& .bt": {
                        width: "100% !important",
                        height: `${isPc ? "90px" : "70px"} !important`,
                        justifyContent: "flex-end",
                        borderRadius: "18px !important",
                        position: "relative",
                    },
                    "& .text-wrapper": {
                        width: `${isPc ? "280px" : "140px"} !important`,
                    },
                    "& .play-button-text": {
                        fontSize: isPc ? "32px" : "20px",
                        fontWeight: "400",
                    },
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
                    <Text
                        sx={{
                            fontSize: isPc ? "30px" : "16px",
                            fontWeight: 700,
                            WebkitTextStrokeWidth: 1,
                            WebkitTextStrokeColor: "#FDDC2D",
                            textAlign: "center",
                            margin: "0 10px",
                            fontFamily: "Orbitron",
                        }}
                    >
                        1 v 1 GAME
                    </Text>
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                </Flex>
                <Flex
                    className="bt"
                    align={"center"}
                    onClick={() => {
                        onPlayTournament();
                    }}
                    sx={{
                        paddingLeft: isPc
                            ? "100px !important"
                            : "40px !important",
                        marginTop: isPc ? "36px" : "20px",
                        cursor: "pointer",
                        background: `url(${ButtonBg})`,
                        backgroundSize: "100% 100%",
                    }}
                >
                    <Image
                        src={SoloIcon}
                        sx={{
                            width: isPc ? "120px" : "80px",
                            position: "absolute",
                            left: "-10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    ></Image>
                    <Box
                        sx={{
                            textAlign: "center",
                            width: "100%",
                        }}
                        className="text-wrapper"
                    >
                        <Text
                            className="play-button-text"
                            sx={{
                                color: "#fff",
                            }}
                        >
                            Start Game
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

const PvpHomePage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const navigate = useNavigate();
    const { openLoading, closeLoading, isLoading } = useSubmitRequest();
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const multiTestSkylabBidTacToeFactoryContract =
        useMultiTestSkylabBidTacToeFactoryContract();
    const { privateKey, pvpAddress } = usePvpInfo();
    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const handlePlay1V1 = async () => {
        try {
            openLoading();
            const password = 1234;
            localStorage.setItem("password", String(password));
            const encodedPassword = ethersUtils.defaultAbiCoder.encode(
                ["uint256"],
                [password],
            );
            const hashedPassword = ethersUtils.keccak256(encodedPassword);
            await bttFactoryRetryPaymaster("createPvPRoom", [
                [3, 3, 3, 100, 1, 0, false, 1 * 60 * 60],
                hashedPassword,
            ]);

            handleGetGamePerPlayer();
            closeLoading();
        } catch (e) {
            toast(handleError(e));
            closeLoading();
        }
    };

    const handleGetGamePerPlayer = async () => {
        const [gameAddress] = await multiProvider.all([
            multiTestSkylabBidTacToeFactoryContract.gamePerPlayer(pvpAddress),
        ]);

        console.log(gameAddress, pvpAddress, "gameAddress");

        if (gameAddress !== ZERO_DATA) {
            navigate(`/pvp/game?gameAddress=${gameAddress}`);
        }
    };

    useEffect(() => {
        if (
            !pvpAddress ||
            !multiProvider ||
            !multiTestSkylabBidTacToeFactoryContract
        ) {
            return;
        }
        handleGetGamePerPlayer();
    }, [multiProvider, multiTestSkylabBidTacToeFactoryContract, pvpAddress]);

    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            justify={"center"}
            sx={{
                height: "100%",
            }}
        >
            <PlayButtonGroup onPlayTournament={handlePlay1V1}></PlayButtonGroup>
        </Flex>
    );
};

export default PvpHomePage;
