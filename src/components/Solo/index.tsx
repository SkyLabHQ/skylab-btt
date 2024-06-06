import { useInitData, useLaunchParams, useUtils } from "@tma.js/sdk-react";
import React, { useEffect } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { useLocation } from "react-router-dom";
import { initUtils } from "@tma.js/sdk";

const SoloPage = () => {
    const initDataRaw = useLaunchParams().initDataRaw;
    const initData = useInitData();
    const utils = initUtils();
    const utilsss = useUtils();

    console.log(initData, "initData");

    const { hash, queryId, chatType, chatInstance, authDate } = initData;

    console.log(
        hash,
        queryId,
        chatType,
        chatInstance,
        authDate,

        "initData",
    );

    return (
        <button
            onClick={() => {
                (utilsss as any).shareURL(
                    " https://t.me/testtesttesttesttest_bot/hahaha",
                    "aaa",
                );
            }}
        >
            Show Alert111122222
        </button>
    );
};

export default SoloPage;
