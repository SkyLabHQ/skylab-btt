import { useInitData } from "@tma.js/sdk-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { login } from "@/api";
import useSkyToast from "@/hooks/useSkyToast";
import { ethers } from "ethers";
import { useSCWallet } from "@/hooks/useSCWallet";

const PvpContext = createContext<{
    privateKey: string;
    pvpAddress: string;
}>(null);

export const PvpProvider = () => {
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [init, setInit] = useState(false);
    const [privateKey, setPrivateKey] = useState("");
    const { sCWAddress: pvpAddress } = useSCWallet(privateKey);
    console.log(privateKey, "privateKey");
    const initData = useInitData();
    const handleLogin = async () => {
        try {
            if (initData.user) {
                const res = await login(initData.user);
                console.log(res.data);
                if (res.code === 200) {
                    setPrivateKey(res.data.privateKey);
                }
            }
        } catch (e) {
            console.log(e);
            toast("Please open it in Telegram");
        } finally {
            setInit(true);
        }

        if (initData.startParam && initData.startParam !== "debug") {
            console.log(initData, "initData.startParam");
            const [gameAddress, password] = initData.startParam.split("-");
            navigate(
                `/pvp/accept?gameAddress=${gameAddress}&password=${password}`,
            );
        }
    };
    useEffect(() => {
        handleLogin();
    }, [initData]);

    return (
        <PvpContext.Provider
            value={{
                privateKey,
                pvpAddress,
            }}
        >
            <Outlet></Outlet>
        </PvpContext.Provider>
    );
};

export const usePvpInfo = () => {
    return useContext(PvpContext);
};
