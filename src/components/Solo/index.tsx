import { useInitData, useLaunchParams } from "@tma.js/sdk-react";
import React, { useEffect } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { useLocation } from "react-router-dom";

const SoloPage = () => {
    const data = useInitData();
    console.log(data, "data");
    console.log(window?.Telegram?.WebApp, "t1111elegram");

    // const initDataRaw = useLaunchParams();
    // console.log(initDataRaw, "initDataRaw");

    // useEffect(() => {

    //     setInterval(() => {
    //         console.log(window.location);
    //     }, 1000);
    // }, []);

    return <button onClick={() => {}}>Show Alert</button>;
};

export default SoloPage;
