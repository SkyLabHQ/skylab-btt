import { useState } from "react";
import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LoadingIcon from "@/assets/loading.svg";
import QuitModal from "@/components/BttComponents/QuitModal";
import { useLocation } from "react-router-dom";
import { handleError } from "@/utils/error";
import ToolBar from "../BttComponents/Toolbar";
import useSkyToast from "@/hooks/useSkyToast";
import DotLoading from "../Loading/DotLoading";
import ArrowIcon from "./assets/arrow-up.svg";
import { TG_URL } from "@/skyConstants/tgConfig";
import { quitMatch, storeAccessToken } from "@/api/tournament";
import qs from "query-string";
import { useGameContext } from "@/pages/TacToe";
import { aviationImg } from "@/utils/aviationImg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const PlaneImg = ({ detail, flip }: { detail: any; flip?: boolean }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <>
            {detail?.address ? (
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Image
                        src={aviationImg(detail.level)}
                        sx={{
                            width: isPc ? "280px" : "136px",
                            transform: flip ? "scaleX(-1)" : "",
                            /*兼容IE*/
                            filter: "FlipH",
                        }}
                    ></Image>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: isPc ? "280px" : "136px",
                        height: isPc ? "280px" : "136px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <motion.img
                        src={LoadingIcon}
                        style={{
                            width: isPc ? "120px" : "58px",
                            rotate: 0,
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 3,
                        }}
                        animate={{ rotate: 360 }}
                    />
                </Box>
            )}
        </>
    );
};

const StopMatch = ({ onClick }: { onClick: () => void }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Flex
                onClick={onClick}
                align={"center"}
                justify={"center"}
                sx={{
                    border: "3px solid #bcbbbe",
                    width: isPc ? "320px " : "180px !important",
                    height: isPc ? "64px !important" : "50px !important",
                    background: "#303030",
                    marginTop: isPc ? "150px" : "20px",
                    borderRadius: isPc ? "12px" : "10px !important",
                    fontSize: isPc ? "24px" : "14px",
                    cursor: "pointer",
                }}
            >
                Quit Matching
            </Flex>
            <Flex
                onClick={async () => {
                    try {
                        const res = await storeAccessToken();
                        const shortAccessToken = res.data.shortAccessToken;
                        window.open(
                            `${TG_URL}?start=${shortAccessToken}`,
                            "_blank",
                        );
                    } catch (e: any) {
                        toast(e.data.message);
                    }
                }}
                align={"center"}
                justify={"center"}
                sx={{
                    border: "3px solid #bcbbbe",
                    width: isPc ? "320px" : "180px !important",
                    height: isPc ? "64px !important" : "50px !important",
                    background: "#303030",
                    marginTop: isPc ? "32px" : "16px",
                    borderRadius: isPc ? "12px" : "10px !important",
                    fontSize: isPc ? "24px" : "14px",
                    cursor: "pointer",
                }}
            >
                Link Wallet with TG Bot
            </Flex>
            <Flex
                flexDir={"column"}
                align={"center"}
                sx={{
                    marginTop: isPc ? "16px" : "10px",
                }}
            >
                <Image
                    src={ArrowIcon}
                    sx={{
                        width: isPc ? "16px" : "12px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontSize: isPc ? "18px" : "12px",
                        marginTop: "4px",
                    }}
                >
                    You can click to go to TG-Bot to bind your wallet
                </Text>
            </Flex>
        </Box>
    );
};

export const MatchPage = () => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [gameId] = useState<string>(params.gameId);
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useSkyToast();
    const { myGameInfo, opGameInfo } = useGameContext();

    const handleQuit = async () => {
        try {
            await quitMatch({
                gameId: Number(gameId),
            });
            onClose();
        } catch (error) {
            console.log(error);
            toast(handleError(error));
        }
    };

    return (
        <Box
            pos="relative"
            bgRepeat="no-repeat,no-repeat"
            height="100%"
            bgPos={"center bottom,center center"}
            bgSize={"100%,100% 100%"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                padding: "24px 24px",
            }}
            justifyContent={isPc ? "flex-start" : "center"}
        >
            <Box
                sx={{
                    height: "5.3704vh",
                    position: "relative",
                    width: "100%",
                }}
            >
                <ToolBar
                    quitType="wait"
                    onQuitClick={() => {
                        onOpen();
                    }}
                ></ToolBar>
            </Box>

            <Box
                sx={{
                    fontWeight: 700,
                }}
            >
                <DotLoading
                    text={"Matching"}
                    fontSize={isPc ? "28px" : "20px"}
                ></DotLoading>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1vh",
                }}
            >
                <PlaneImg detail={myGameInfo}></PlaneImg>
                <Text
                    sx={{
                        fontSize: isPc ? "32px" : "20px",
                        margin: "0 30px",
                    }}
                >
                    VS
                </Text>
                <PlaneImg detail={opGameInfo} flip={true}></PlaneImg>
            </Box>
            <StopMatch
                onClick={() => {
                    onOpen();
                }}
            ></StopMatch>

            <QuitModal
                onConfirm={handleQuit}
                isOpen={isOpen}
                onClose={onClose}
                quitType="wait"
            ></QuitModal>
        </Box>
    );
};

export default MatchPage;
