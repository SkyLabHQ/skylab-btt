import {
    Box,
    Flex,
    Text,
    Image,
    useMediaQuery,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";
import UserIcon from "@/assets/user1.svg";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import Nest from "@/components/Nest";
import { MINI_APP_URL } from "@/skyConstants/tgConfig";
import { shortenAddress } from "@/utils";
import QuitModal from "@/components/BttComponents/QuitModal";
import useSkyToast from "@/hooks/useSkyToast";
import { useBttFactoryRetryPaymaster } from "@/hooks/useRetryContract";
import { handleError } from "@/utils/error";
import ToolBar from "@/components/BttComponents/Toolbar";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useSCWallet } from "@/hooks/useSCWallet";
import { ZERO_DATA } from "@/skyConstants";

const MatchPage = () => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [gameAddress] = useState<string>(params.gameAddress);
    const [myInfo, setMyInfo] = useState<any>({
        burner: "",
        address: "",
        img: "",
        mark: UserMarkType.Empty,
    });
    const [opInfo, setOpInfo] = useState<any>({
        burner: "",
        address: "",
        img: "",
        mark: UserMarkType.Empty,
    });
    const [privateKey, setPrivateKey] = useState<string>("");
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const { sCWAddress: pvpAddress } = useSCWallet(privateKey);

    const toast = useSkyToast();
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const handleQuit = async () => {
        try {
            await bttFactoryRetryPaymaster("quitPvpRoom", []);
            navigate(`/pvp/home`);
        } catch (error) {
            toast(handleError(error));
        }
    };

    const shareUrl = useMemo(() => {
        try {
            const pvpPasswords =
                JSON.parse(localStorage.getItem("pvpPasswords")) || {};
            const share_url =
                "https://t.me/share/url?url=" +
                encodeURIComponent(
                    `${MINI_APP_URL}?startapp=accept-${gameAddress}-${pvpPasswords[gameAddress]}`,
                ) +
                "&text=" +
                encodeURIComponent(
                    "Bid Tac Toe is a super fun variant of the Tic Tac Toe game. I invite you to play with me. Click here to accept my invite!",
                );
            return share_url;
        } catch (e) {
            console.log(e);
            return "";
        }
    }, []);

    const handleGetAllPlayerInfo = async () => {
        let [playerAddress1, playerAddress2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        playerAddress1 = playerAddress1.toLocaleLowerCase();
        playerAddress2 = playerAddress2.toLocaleLowerCase();

        console.log("playerAddress1", playerAddress1);
        console.log("playerAddress2", playerAddress2);
        console.log("pvpAddress", pvpAddress);
        if (playerAddress1 !== ZERO_DATA && playerAddress2 !== ZERO_DATA) {
            if (playerAddress1 === pvpAddress) {
                setMyInfo({
                    address: playerAddress1,
                    mark: UserMarkType.Circle,
                });
                setOpInfo({
                    address: playerAddress2,
                    mark: UserMarkType.Cross,
                });
            } else {
                setMyInfo({
                    address: playerAddress2,
                    mark: UserMarkType.Cross,
                });
                setOpInfo({
                    address: playerAddress1,
                    mark: UserMarkType.Circle,
                });
            }

            setTimeout(() => {
                navigate(`/pvp/game?gameAddress=${gameAddress}`);
            }, 2000);
        } else if (playerAddress1 !== pvpAddress) {
            navigate("/pvp/home");
        }
    };

    useEffect(() => {
        try {
            const gameAddress = params.gameAddress;
            const pvpPrivateKeys = localStorage.getItem("pvpPrivateKeys")
                ? JSON.parse(localStorage.getItem("pvpPrivateKeys"))
                : {};
            if (pvpPrivateKeys[gameAddress]) {
                setPrivateKey(pvpPrivateKeys[gameAddress]);
            } else {
                navigate("/pvp/home");
            }
        } catch (e) {
            console.log(e);
            navigate("/pvp/home");
        }
    }, []);

    useEffect(() => {
        if (!multiSkylabBidTacToeGameContract || !multiProvider || !pvpAddress)
            return;

        const timer = setInterval(() => {
            handleGetAllPlayerInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [
        multiSkylabBidTacToeGameContract,
        multiProvider,
        myInfo.address,
        opInfo.address,
        pvpAddress,
    ]);

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
                <Flex
                    align={"center"}
                    h={"100%"}
                    justify={"center"}
                    sx={{
                        padding: "0 20px",
                    }}
                >
                    <ToolBar
                        quitType="wait"
                        onQuitClick={() => {
                            onOpen();
                        }}
                    ></ToolBar>

                    <Box
                        sx={{
                            width: isPc ? "600px" : "350px",
                        }}
                    >
                        <Flex
                            align={"center"}
                            justify={"space-around"}
                            w={"100%"}
                            sx={{
                                height: isPc ? "250px" : "120px",
                                marginTop: "40px",
                            }}
                        >
                            {shortenAddress(myInfo?.address)}
                            <Text
                                sx={{
                                    fontSize: isPc ? "48px" : "20px",
                                }}
                            >
                                VS
                            </Text>
                            {shortenAddress(opInfo?.address)}
                        </Flex>

                        <a href={shareUrl} target="_blank">
                            <Flex
                                justify={"center"}
                                flexDir={"column"}
                                align={"center"}
                            >
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        width: isPc ? "420px" : "180px",
                                        height: isPc ? "55px" : "40px",
                                        borderRadius: isPc ? "18px" : "12px",
                                        border: "2px solid #FFF",
                                        background: "#303030",
                                        fontSize: isPc ? "24px" : "14px",
                                        marginTop: isPc ? "74px" : "20px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Image
                                        sx={{
                                            width: isPc ? "32px" : "16px",
                                            height: isPc ? "32px" : "16px",
                                            marginRight: isPc ? "12px" : "6px",
                                        }}
                                        src={UserIcon}
                                    ></Image>
                                    <Text>Invite Friend</Text>
                                </Flex>
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    onClick={() => {
                                        onOpen();
                                    }}
                                    sx={{
                                        width: isPc ? "420px" : "180px",
                                        height: isPc ? "55px" : "40px",
                                        borderRadius: isPc ? "18px" : "12px",
                                        border: "2px solid #FFF",
                                        background: "#303030",
                                        fontSize: isPc ? "24px" : "14px",
                                        marginTop: isPc ? "60px" : "20px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Text>Quit Match</Text>
                                </Flex>
                            </Flex>
                        </a>
                    </Box>
                    <QuitModal
                        onConfirm={handleQuit}
                        isOpen={isOpen}
                        onClose={onClose}
                        quitType={"wait"}
                    ></QuitModal>
                </Flex>
            </Box>
            <Nest />
        </Box>
    );
};

export default MatchPage;
