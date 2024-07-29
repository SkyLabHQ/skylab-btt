import { SDKProvider, useLaunchParams } from "@tma.js/sdk-react";
import { mockTelegramEnv, parseInitData } from "@tma.js/sdk";
import {
    useInitData,
    serializeLaunchParams,
    useInitDataRaw,
} from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { login } from "@/api";
import useSkyToast from "@/hooks/useSkyToast";
import LoadingPage from "./LoadingPage";
import { Box } from "@chakra-ui/react";
import Nest from "./Nest";

const PvpLayout = () => {
    const launchParams = useLaunchParams();
    const toast = useSkyToast();
    const [init, setInit] = useState(false);

    const handleLogin = async () => {
        const { initDataRaw } = launchParams;
        const res = await login({ initDataRaw });
        if (res.code === 200) {
            const jwtToken = res.data.jwtToken;
            sessionStorage.setItem("jwtToken", jwtToken);
            setInit(true);
        } else {
            toast(res.message);
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);

    return init ? (
        <Outlet></Outlet>
    ) : (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <LoadingPage></LoadingPage>
            <Nest></Nest>
        </Box>
    );
};

export default PvpLayout;
