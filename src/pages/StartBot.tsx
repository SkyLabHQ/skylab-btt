import React, { useState } from "react";
import { Box, Flex, useMediaQuery, Image, Text } from "@chakra-ui/react";
import LineBg from "@/assets/line.png";
import ButtonBg from "@/assets/bt-bg.png";
import BttIcon from "@/assets/btt-icon.png";
import BotIcon from "@/assets/bot-icon.svg";
import Nest from "@/components/Nest";
import { botAddress, skylabTestFlightAddress } from "@/hooks/useContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { handleError } from "@/utils/error";
import useSkyToast from "@/hooks/useSkyToast";
import {
    useBttFactoryRetryPaymaster,
    useTestflightRetryPaymaster,
} from "@/hooks/useRetryContract";
import { ethers } from "ethers";
import { useSCWallet } from "@/hooks/useSCWallet";
import {
    bttFactoryIface,
    erc721iface,
    topic0Transfer,
} from "@/skyConstants/iface";
import { useNavigate } from "react-router-dom";
import { useSubmitRequest } from "@/contexts/SubmitRequest";

const PlayButtonGroup = () => {
    const { closeLoading, openLoading } = useSubmitRequest();
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [privateKey] = useState<string>(
        ethers.Wallet.createRandom().privateKey,
    );
    const { sCWAddress: botAccount } = useSCWallet(privateKey);
    const testflightRetryPaymaster = useTestflightRetryPaymaster({
        privateKey,
    });

    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const handleMintPlayTest = async () => {
        if (!botAccount) {
            return;
        }
        try {
            openLoading();
            const receipt = await testflightRetryPaymaster("playTestMint", []);
            const transferLog = receipt.logs.find((item: any) => {
                return item.topics[0] === topic0Transfer;
            });
            const transferData = erc721iface.parseLog({
                data: transferLog.data,
                topics: transferLog.topics,
            });
            const tokenId = transferData.args.tokenId.toNumber();
            await bttFactoryRetryPaymaster("approveForGame", [
                botAccount,
                tokenId,
                skylabTestFlightAddress[TESTFLIGHT_CHAINID],
            ]);
            const createBotGameReceipt = await bttFactoryRetryPaymaster(
                "createBotGame",
                [botAddress[TESTFLIGHT_CHAINID]],
            );

            const startBotGameTopic0 =
                bttFactoryIface.getEventTopic("StartBotGame");

            const startBotGameLog = createBotGameReceipt.logs.find(
                (item: any) => {
                    return item.topics[0] === startBotGameTopic0;
                },
            );

            const startBotGameData = bttFactoryIface.parseLog({
                data: startBotGameLog.data,
                topics: startBotGameLog.topics,
            });

            sessionStorage.setItem("testflight", privateKey);
            const url = `/btt/game?tokenId=${tokenId}&gameAddress=${startBotGameData.args.gameAddress}&testflight=true`;
            console.log(url, "url");
            closeLoading();
            navigate(url);
        } catch (error) {
            console.log(error);
            toast(handleError(error, true));
            closeLoading();
        }
    };
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
                    fontFamily: "Orbitron",
                    position: "relative",
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
                            margin: "0 10px",
                            fontWeight: 700,
                            fontSize: "16px",
                            textAlign: "center",
                            color: "#FDDC2D",
                        }}
                    >
                        <Text>Game With Bot</Text>
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
                    onClick={handleMintPlayTest}
                    alignItems={"center"}
                    justify={"center"}
                    sx={{
                        width: "194px",
                        height: "60px",
                        marginTop: isPc ? "36px" : "20px",
                        cursor: "pointer",
                        background: `url(${ButtonBg})`,
                        backgroundSize: "100% 100%",
                        position: "relative",
                    }}
                >
                    <Image
                        src={BotIcon}
                        sx={{
                            position: "absolute",
                            left: "-10px",
                            top: "20%",
                            transform: "translateY(-50%)",
                        }}
                    ></Image>
                    <Text
                        className="play-button-text"
                        sx={{
                            color: "#fff",
                            paddingLeft: "20px",
                        }}
                    >
                        Start Game
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

const StartBot = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
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
                <PlayButtonGroup></PlayButtonGroup>
            </Flex>
            <Nest />
        </Box>
    );
};

export default StartBot;
