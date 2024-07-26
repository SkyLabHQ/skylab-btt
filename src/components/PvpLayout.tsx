import { SDKProvider, useLaunchParams } from "@tma.js/sdk-react";
import { mockTelegramEnv, parseInitData } from "@tma.js/sdk";
import {
    useInitData,
    serializeLaunchParams,
    useInitDataRaw,
} from "@tma.js/sdk-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { login } from "@/api";
import useSkyToast from "@/hooks/useSkyToast";

const PvpLayout = () => {
    const launchParams = useLaunchParams();
    const toast = useSkyToast();

    const handleLogin = async () => {
        const { initDataRaw } = launchParams;
        const res = await login({ initDataRaw });
        if (res.code === 200) {
            const jwtToken = res.data.jwtToken;
            sessionStorage.setItem("jwtToken", jwtToken);
        } else {
            toast(res.message);
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);

    return <Outlet></Outlet>;
};

export default PvpLayout;
