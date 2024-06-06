import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
    Box,
    ChakraProvider,
    ColorModeScript,
    useMediaQuery,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { GlobalStyles } from "./skyConstants";
import AppRoutes from "./Routes";
import theme from "./theme";
import { HelmetProvider } from "react-helmet-async";
import { base, baseSepolia } from "viem/chains";
import { SubmitRequestProvider } from "./contexts/SubmitRequest";
import { PrivyProvider } from "@privy-io/react-auth";
import logoIcon from "./assets/tournament.jpg";
import { UserInfoProvider } from "./contexts/UserInfo";
import { mockTelegramEnv, parseInitData } from "@tma.js/sdk-react";

const chains =
    process.env.REACT_APP_ENV === "development" ? [baseSepolia] : [baseSepolia];

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const config = createConfig(
    getDefaultConfig({
        chains,
        walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
        appName: "Skylab-Btt",
        appUrl: window.location.host, // your app's url
        appIcon: logoIcon, // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const RootContent = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [isMBrowser, setIsMBrowser] = useState(false);

    useEffect(() => {
        // 手机浏览器模式
        if (!window.matchMedia("(display-mode: standalone)").matches && !isPc) {
            setIsMBrowser(true);
            return;
        } else {
            setIsMBrowser(false);
        }
    }, [isPc]);
    return (
        <PrivyProvider
            appId="clt24409l0clp3488rr6vgpwh"
            config={{
                defaultChain: baseSepolia,
                appearance: {
                    accentColor: "#6A6FF5",
                    theme: "#FFFFFF",
                    showWalletLoginFirst: false,
                    logo: "https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png",
                },
                loginMethods: isMBrowser
                    ? ["email", "wallet"]
                    : ["email", "wallet", "discord", "twitter"],
                embeddedWallets: {
                    createOnLogin: "users-without-wallets",
                    requireUserPasswordOnCreate: false,
                },
                mfa: { noPromptOnMfaRequired: false },
            }}
        >
            <ChakraProvider theme={theme}>
                <Global styles={GlobalStyles} />
                <BrowserRouter>
                    <WagmiConfig config={config}>
                        <UserInfoProvider>
                            <SubmitRequestProvider>
                                <Fragment>
                                    <HelmetProvider>
                                        <AppRoutes />
                                    </HelmetProvider>
                                </Fragment>
                            </SubmitRequestProvider>
                        </UserInfoProvider>
                    </WagmiConfig>
                </BrowserRouter>
            </ChakraProvider>
        </PrivyProvider>
    );
};

// const initDataRaw = new URLSearchParams([
//     [
//         "user",
//         JSON.stringify({
//             id: 99281932,
//             first_name: "Andrew",
//             last_name: "Rogue",
//             username: "rogue",
//             language_code: "en",
//             is_premium: true,
//             allows_write_to_pm: true,
//         }),
//     ],
//     [
//         "hash",
//         "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
//     ],
//     ["auth_date", "1716922846"],
//     ["start_param", "debug"],
//     ["chat_type", "sender"],
//     ["chat_instance", "8428209589180549439"],
// ]).toString();

// mockTelegramEnv({
//     themeParams: {
//         accentTextColor: "#6ab2f2",
//         bgColor: "#17212b",
//         buttonColor: "#5288c1",
//         buttonTextColor: "#ffffff",
//         destructiveTextColor: "#ec3942",
//         headerBgColor: "#17212b",
//         hintColor: "#708499",
//         linkColor: "#6ab3f3",
//         secondaryBgColor: "#232e3c",
//         sectionBgColor: "#17212b",
//         sectionHeaderTextColor: "#6ab3f3",
//         subtitleTextColor: "#708499",
//         textColor: "#f5f5f5",
//     },
//     initData: parseInitData(initDataRaw),
//     initDataRaw,
//     version: "7.2",
//     platform: "tdesktop",
// });

root.render(
    <Box sx={{ height: "100%" }}>
        <ColorModeScript />
        <RootContent></RootContent>
    </Box>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
