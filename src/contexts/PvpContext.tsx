import { useInitData } from "@tma.js/sdk-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { login } from "@/api";
import useSkyToast from "@/hooks/useSkyToast";
import { ethers } from "ethers";
import { useSCWallet } from "@/hooks/useSCWallet";

const PvpContext = createContext<{
    privateKey: string;
    pvpAddress: string;
}>(null);

const wallet = ethers.Wallet.createRandom();
console.log(wallet, "wallet");

export const PvpProvider = () => {
    const toast = useSkyToast();
    const [init, setInit] = useState(false);
    const [privateKey, setPrivateKey] = useState(
        sessionStorage.getItem("pvpPrivatekey"),
    );
    const { sCWAddress: pvpAddress } = useSCWallet(privateKey);

    const initData = useInitData();

    const handleLogin = async () => {
        try {
            if (initData.user) {
                const res = await login(initData.user);
                console.log(res);
                if (res.code === 200) {
                    // setPrivateKey(res.data.privateKey);
                }
            }
        } catch (e) {
            console.log(e);
            toast("Please open it in Telegram");
        } finally {
            setInit(true);
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
