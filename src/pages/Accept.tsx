import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
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
import { ZERO_DATA } from "@/skyConstants";
import { ethers } from "ethers";
import { useSCWallet } from "@/hooks/useSCWallet";
import { bindBurner } from "@/api";
import { useInitData } from "@tma.js/sdk-react";
import LoadingPage from "@/components/LoadingPage";

const Accept = () => {
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [player1, setPlayer1] = useState<string>("");
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [init, setInit] = useState(false);
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [privateKey, setPrivateKey] = useState("");
    const { sCWAddress: pvpAddress } = useSCWallet(privateKey);
    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });
    const initData = useInitData();
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
            await bindBurner({
                user: initData.user,
                burner: pvpAddress,
            });
            await bttFactoryRetryPaymaster("joinPvPRoom", [
                player1,
                params.password,
            ]);
            const pvpPrivateKeys = localStorage.getItem("pvpPrivateKeys")
                ? JSON.parse(localStorage.getItem("pvpPrivateKeys"))
                : {};
            pvpPrivateKeys[gameAddress] = privateKey;
            localStorage.setItem(
                "pvpPrivateKeys",
                JSON.stringify(pvpPrivateKeys),
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
            if (
                playerAddress1 === pvpAddress ||
                playerAddress2 === pvpAddress
            ) {
                navigate(`/pvp/game?gameAddress=${gameAddress}`);
            } else {
                navigate("/pvp/home");
            }
        }

        if (playerAddress1 !== ZERO_DATA) {
            if (playerAddress1 === pvpAddress) {
                navigate(`/pvp/match?gameAddress=${gameAddress}`);
                return;
            }

            setPlayer1(playerAddress1);
        }
        setInit(true);
    };

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiProvider ||
            !gameAddress ||
            !pvpAddress
        )
            return;

        handleGetAllPlayerInfo();
    }, [
        multiSkylabBidTacToeGameContract,
        multiProvider,
        gameAddress,
        pvpAddress,
    ]);

    useEffect(() => {
        const pvpPrivateKeys = localStorage.getItem("pvpPrivateKeys")
            ? JSON.parse(localStorage.getItem("pvpPrivateKeys"))
            : {};
        if (pvpPrivateKeys[gameAddress]) {
            setPrivateKey(pvpPrivateKeys[gameAddress]);
        } else {
            const newWallet = ethers.Wallet.createRandom().privateKey;
            setPrivateKey(newWallet);
        }
    }, [gameAddress]);

    return (
        <>
            {init ? (
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
            ) : (
                <LoadingPage></LoadingPage>
            )}
        </>
    );
};
export default Accept;
