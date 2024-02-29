import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { GlobalStyles } from "./skyConstants";
import AppRoutes from "./Routes";
import theme from "./theme";
import { HelmetProvider } from "react-helmet-async";
import { BlockNumberProvider } from "./contexts/BlockNumber";
import { base, baseSepolia } from "viem/chains";
import { SubmitRequestProvider } from "./contexts/SubmitRequest";
import { PrivyProvider } from "@privy-io/react-auth";
import logoIcon from "./assets/tournament.jpg";

const chains =
    process.env.REACT_APP_ENV === "development" ? [baseSepolia] : [base];

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

root.render(
    <Box sx={{ height: "100%" }}>
        <ColorModeScript />
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
                loginMethods: ["wallet", "discord", "twitter"],
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
                        <BlockNumberProvider>
                            <SubmitRequestProvider>
                                <Fragment>
                                    <HelmetProvider>
                                        <AppRoutes />
                                    </HelmetProvider>
                                </Fragment>
                            </SubmitRequestProvider>
                        </BlockNumberProvider>
                    </WagmiConfig>
                </BrowserRouter>
            </ChakraProvider>
        </PrivyProvider>
    </Box>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
