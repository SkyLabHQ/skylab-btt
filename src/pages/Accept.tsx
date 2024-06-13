import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import ToolBar from "@/components/BttComponents/Toolbar";
import { shortenAddress } from "@/utils";
import { BackWithText } from "@/components/Back";
import Nest from "@/components/Nest";
import { useBttFactoryRetryPaymaster } from "@/hooks/useRetryContract";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import { handleError } from "@/utils/error";
import useSkyToast from "@/hooks/useSkyToast";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { usePvpInfo } from "@/contexts/PvpContext";
import { ZERO_DATA } from "@/skyConstants";

const Accept = () => {
    const navigate = useNavigate();

    const toast = useSkyToast();
    const [player1, setPlayer1] = useState<string>("");
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const { privateKey, pvpAddress } = usePvpInfo();
    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const [gameAddress] = useState<string>(params.gameAddress);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);

    const handleJoinGame = async () => {
        if (isLoading) {
            return;
        }

        try {
            openLoading();
            await bttFactoryRetryPaymaster(
                "joinPvPRoom",
                [player1, params.password],
                {
                    signer: {
                        privateKey,
                    },
                },
            );
            closeLoading();
            navigate(`/pvp/game?gameAddress=${gameAddress}`);
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };

    const handleCancel = () => {
        navigate("/pvp/home", {
            replace: true,
        });
    };

    const handleGetAllPlayerInfo = async () => {
        const [playerAddress1, playerAddress2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        console.log("playerAddress1", playerAddress1);
        console.log("playerAddress2", playerAddress2);
        console.log("pvpAddress", pvpAddress);
        if (playerAddress1 !== ZERO_DATA) {
            setPlayer1(playerAddress1);
            if (playerAddress1 === pvpAddress) {
                navigate(`/pvp/game?gameAddress=${gameAddress}`);
                return;
            }
        }

        if (playerAddress2 !== ZERO_DATA) {
            if (playerAddress2 === pvpAddress) {
                navigate(`/pvp/game?gameAddress=${gameAddress}`);
                return;
            }
        }

        if (playerAddress1 !== ZERO_DATA && playerAddress2 !== ZERO_DATA) {
            if (
                playerAddress1 !== pvpAddress &&
                playerAddress2 !== pvpAddress
            ) {
                navigate("/pvp/home", {
                    replace: true,
                });
                return;
            }
        }
    };

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiProvider ||
            !gameAddress ||
            !pvpAddress
        )
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
        gameAddress,
        pvpAddress,
    ]);

    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                }}
            >
                <BackWithText
                    onClick={handleCancel}
                    textContent={
                        <Box
                            sx={{
                                fontSize: isPc ? "16px" : "12px",
                                textAlign: "center",
                                lineHeight: "1",
                                marginTop: "8px",
                            }}
                        >
                            <Text>Back</Text>
                            {isPc && <Text>To Arena</Text>}
                        </Box>
                    }
                ></BackWithText>
            </Box>
            <ToolBar
                quitType="wait"
                onQuitClick={() => {
                    // onOpen();
                }}
            ></ToolBar>
            <Box
                sx={{
                    fontSize: isPc ? "24px" : "16px",
                }}
            >
                Accept {shortenAddress(player1)} 1v1 invitation?{" "}
            </Box>
            <Flex
                onClick={handleJoinGame}
                justify={"center"}
                align={"center"}
                sx={{
                    fontSize: isPc ? "32px" : "20px",
                    width: isPc ? "378px" : "168px",
                    height: isPc ? "90px" : "40px",
                    borderRadius: isPc ? "20px" : "12px",
                    border: "2px solid #fff",
                    marginTop: "40px",
                    background: "#303030",
                    cursor: "pointer",
                }}
            >
                <Box>Accept</Box>
            </Flex>
            <Flex
                onClick={handleCancel}
                justify={"center"}
                align={"center"}
                sx={{
                    fontSize: isPc ? "32px" : "20px",
                    width: isPc ? "378px" : "168px",
                    height: isPc ? "90px" : "40px",
                    borderRadius: isPc ? "20px" : "12px",
                    border: "2px solid #fff",
                    marginTop: isPc ? "40px" : "20px",
                    background: "#303030",
                    cursor: "pointer",
                }}
            >
                Cancel
            </Flex>
            <Nest />
        </Flex>
    );
};
export default Accept;
