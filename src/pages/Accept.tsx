import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { shortenAddress } from "@/utils";
import { BackWithText } from "@/components/Back";
import Nest from "@/components/Nest";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import { handleError } from "@/utils/error";
import useSkyToast from "@/hooks/useSkyToast";

import { useInitData } from "@tma.js/sdk-react";
import { getGameInfo, joinGame } from "@/api/pvpGame";

const Accept = () => {
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [player1, setPlayer1] = useState<string>("");
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const { search } = useLocation();
    const [gameInfo, setGameInfo] = useState<any>();
    const params = qs.parse(search) as any;

    const initData = useInitData();
    const [gameId] = useState<string>(params.gameId);

    const handleJoinGame = async () => {
        if (isLoading) {
            return;
        }

        try {
            openLoading();
            const res = await joinGame({ gameId: Number(gameId) });
            if (res.code === 200) {
                navigate(`/free/pvp/game?gameId=${gameId}`);
            }

            closeLoading();
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };

    const handleCancel = () => {
        navigate("/free/pvpHome", {
            replace: true,
        });
    };

    const handleGetAllPlayerInfo = async () => {
        if (!gameId) return;

        const gameInfo = await getGameInfo(Number(gameId));

        if (gameInfo.code == 200) {
            setGameInfo(gameInfo.data.game);
        }

        console.log(gameInfo, "gameInfo");
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleGetAllPlayerInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [gameId]);

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
            <Box
                sx={{
                    fontSize: isPc ? "24px" : "16px",
                }}
            >
                Accept {gameInfo?.player1} 1v1 invitation?{" "}
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
