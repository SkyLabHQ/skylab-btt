import { SDKProvider } from "@tma.js/sdk-react";
import { mockTelegramEnv, parseInitData } from "@tma.js/sdk";
import { useInitData } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const customRouters = [
    ["botHome"],
    ["pvpHome"],
    ["accept", "inviteCode", "password"],
    ["pvpGame", "gameAddress"],
    ["botGame", "gameAddress"],
];
const search = new URLSearchParams(window.location.search);

if (search.get("outer")) {
    const initDataRaw = new URLSearchParams([
        [
            "user",
            JSON.stringify({
                id: 888888888,
                first_name: "Andrew",
                last_name: "Rogue",
                username: "rogue",
                language_code: "en",
                is_premium: true,
                allows_write_to_pm: true,
            }),
        ],
        [
            "hash",
            "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
        ],
        ["auth_date", "1716922846"],
        ["start_param", "debug"],
        ["chat_type", "sender"],
        ["chat_instance", "8428209589180549439"],
    ]).toString();

    mockTelegramEnv({
        themeParams: {
            accentTextColor: "#6ab2f2",
            bgColor: "#17212b",
            buttonColor: "#5288c1",
            buttonTextColor: "#ffffff",
            destructiveTextColor: "#ec3942",
            headerBgColor: "#17212b",
            hintColor: "#708499",
            linkColor: "#6ab3f3",
            secondaryBgColor: "#232e3c",
            sectionBgColor: "#17212b",
            sectionHeaderTextColor: "#6ab3f3",
            subtitleTextColor: "#708499",
            textColor: "#f5f5f5",
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: "7.2",
        platform: "tdesktop",
    });
}

const PvpContent = () => {
    const navigate = useNavigate();
    const initData = useInitData();

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/free") {
            if (initData.startParam) {
                const params = initData.startParam.split("-");
                console.log(params, "params");
                const route = customRouters.find(
                    (item) => item[0] === params[0],
                );
                if (route && route.length === params.length) {
                    let url = `/free/${params[0]}`;
                    for (let i = 1; i < params.length; i++) {
                        if (i === 1) {
                            url += "?";
                        } else {
                            url += "&";
                        }

                        url += `${route[i]}=${params[i]}`;
                    }

                    console.log(url, "url");
                    navigate(url);
                }
            } else {
                navigate("/free/pvpHome");
            }
        }
    }, [pathname]);

    return <Outlet></Outlet>;
};

const PvpLayout = () => {
    return (
        <SDKProvider acceptCustomStyles debug>
            <PvpContent></PvpContent>
        </SDKProvider>
    );
};

export default PvpLayout;
