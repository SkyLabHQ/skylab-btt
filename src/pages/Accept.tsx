import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import ToolBar from "@/components/BttComponents/Toolbar";
import { shortenAddress } from "@/utils";
import { BackWithText } from "@/components/Back";
import Nest from "@/components/Nest";
import { usePrivateLobbyContract } from "@/hooks/useRetryContract";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import { handleError } from "@/utils/error";
import useSkyToast from "@/hooks/useSkyToast";

const Accept = () => {
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [from] = useState<string>(params.from);
    const [lobbyAddress] = useState<string>(params.lobbyAddress);
    const [gameAddress] = useState<string>(params.gameAddress);
    const bttPrivateLobbyContract = usePrivateLobbyContract(lobbyAddress);

    const handleJoinGame = async () => {
        if (isLoading) {
            return;
        }
        const privateLobbySigner = getPrivateLobbySigner();
        try {
            openLoading();
            await bttPrivateLobbyContract("joinRoom", [gameAddress]);
            navigate(
                `/btt/lobbyRoom?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
            );
            closeLoading();
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };
    const handleCancel = () => {
        navigate("/");
    };

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
                    fontSize: "24px",
                }}
            >
                Accept {shortenAddress(from)} 1v1 invitation?{" "}
            </Box>
            <Flex
                onClick={handleJoinGame}
                justify={"center"}
                align={"center"}
                sx={{
                    fontSize: "32px",
                    width: "378px",
                    height: "90px",
                    borderRadius: "20px",
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
                    fontSize: "32px",
                    width: "378px",
                    height: "90px",
                    borderRadius: "20px",
                    border: "2px solid #fff",
                    marginTop: "40px",
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
