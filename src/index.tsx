import React, { Fragment, useEffect, useState } from "react";
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
import { base, baseSepolia } from "viem/chains";
import { SubmitRequestProvider } from "./contexts/SubmitRequest";
import { PrivyProvider } from "@privy-io/react-auth";
import logoIcon from "./assets/tournament.jpg";
import { BidIconProvider } from "./contexts/BidIcon";
import useSkyMediaQuery from "./hooks/useSkyMediaQuery";

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
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
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
        <ChakraProvider theme={theme}>
            <Global styles={GlobalStyles} />
            <BrowserRouter>
                <WagmiConfig config={config}>
                    <SubmitRequestProvider>
                        <BidIconProvider>
                            <Fragment>
                                <HelmetProvider>
                                    <AppRoutes />
                                </HelmetProvider>
                            </Fragment>
                        </BidIconProvider>
                    </SubmitRequestProvider>
                </WagmiConfig>
            </BrowserRouter>
        </ChakraProvider>
    );
};

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
