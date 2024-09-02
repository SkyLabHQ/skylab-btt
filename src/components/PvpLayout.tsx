import { useInitData, useLaunchParams } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { login } from "@/api/pvpGame";
import useSkyToast from "@/hooks/useSkyToast";
import { Box, Flex, Text, Image, keyframes } from "@chakra-ui/react";
import HummerIcon from "@/assets/hummer.svg";
import TgLoading from "@/assets/tg-loading.png";
import DotLoading from "./Loading/DotLoading";

const rotate = keyframes`
  from {
    transform: rotate(0deg);}
    
    to {
    transform: rotate(360deg);}
    `;

const LoadingPage = () => {
    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FDDC2D",
                backgroundImage: `url(${HummerIcon})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 66px ",
                color: "#000",
                fontSize: "24px",
                fontWeight: 700,
            }}
        >
            <Text
                sx={{
                    marginTop: "300px",
                    fontSize: "24px",
                    fontWeight: 700,
                }}
            >
                BID TAC TOE
            </Text>
            <Image
                src={TgLoading}
                animation={`${rotate} 2s linear infinite`}
                sx={{
                    width: "40px",
                    marginTop: "20px",
                }}
            ></Image>
            <Box
                sx={{
                    marginTop: "60px",
                }}
            >
                <DotLoading
                    color="#000"
                    text={"Loading"}
                    fontSize={"20px"}
                ></DotLoading>
            </Box>
        </Flex>
    );
};

const PvpLayout = () => {
    const initData = useInitData();
    const launchParams = useLaunchParams();
    const toast = useSkyToast();
    const [init, setInit] = useState(false);

    const handleLogin = async () => {
        const { initDataRaw } = launchParams;
        try {
            const res = await login({ initDataRaw });
            const jwtToken = res.data.jwtToken;
            sessionStorage.setItem("jwtToken", jwtToken);
            setTimeout(() => {
                setInit(true);
            }, 1500);
        } catch (e: any) {
            console.log(e);
            toast(e.data.message);
        }
    };

    useEffect(() => {
        if (!initData.user) {
            return;
        }
        handleLogin();
    }, [initData.user]);

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            {init ? <Outlet></Outlet> : <LoadingPage></LoadingPage>}
        </Box>
    );
};

export default PvpLayout;
