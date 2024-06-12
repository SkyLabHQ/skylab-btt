import React, { useEffect, useState } from "react";
import { Box, Flex, useMediaQuery, Image, Text } from "@chakra-ui/react";
import LineBg from "@/assets/line.png";
import SoloIcon from "./assets/solo-icon.png";
import ButtonBg from "@/assets/bt-bg.png";
import { useBttFactoryRetryPaymaster } from "@/hooks/useRetryContract";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useMultiProvider,
    useMultiTestSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useSCWallet } from "@/hooks/useSCWallet";
import { ZERO_DATA } from "@/skyConstants";
import { utils as ethersUtils } from "ethers";
import { usePvpInfo } from "@/contexts/PvpContext";
import { useCloudStorage } from "@tma.js/sdk-react";

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
    const navigate = useNavigate();

    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const multiTestSkylabBidTacToeFactoryContract =
        useMultiTestSkylabBidTacToeFactoryContract();
    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState<any>({});
    const { privateKey } = usePvpInfo();
    const { sCWAddress } = useSCWallet(privateKey);
    const cloudStorage = useCloudStorage();

    console.log(userInfo, sCWAddress, "location");

    const handlePlay1V1 = async () => {
        try {
            const password = 1234;
            cloudStorage.set("password", String(password));
            const encodedPassword = ethersUtils.defaultAbiCoder.encode(
                ["uint256"],
                [password],
            );
            const hashedPassword = ethersUtils.keccak256(encodedPassword);
            await bttFactoryRetryPaymaster(
                "createPvPRoom",
                [[3, 3, 3, 100, 1, 0, true, 1 * 60 * 60], hashedPassword],
                {
                    signer: { privateKey },
                },
            );

            handleGetGamePerPlayer();
        } catch (e) {
            console.log(e, "ee");
        }
    };

    const handleGetGamePerPlayer = async () => {
        const res = await multiProvider.all([
            multiTestSkylabBidTacToeFactoryContract.gamePerPlayer(sCWAddress),
        ]);

        if (res[0] !== ZERO_DATA) {
            navigate(`/pvp/game?gameAddress=${res[0]}`);
        }
    };

    useEffect(() => {
        if (
            !sCWAddress ||
            !multiProvider ||
            !multiTestSkylabBidTacToeFactoryContract
        ) {
            return;
        }
        handleGetGamePerPlayer();
    }, [multiProvider, multiTestSkylabBidTacToeFactoryContract, sCWAddress]);

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
            <Box
                onClick={() => {
                    // utilsaa.shareURL("");
                    window.TelegramGameProxy.shareScore();
                }}
            >
                share按钮
            </Box>
        </Flex>
    );
};

export default PvpHomePage;
