import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { GlobalStyles } from "./skyConstants";
import AppRoutes, { ScrollToTop } from "./Routes";
import theme from "./theme";
import { HelmetProvider } from "react-helmet-async";

import { BlockNumberProvider } from "./contexts/BlockNumber";
import { base, baseGoerli } from "viem/chains";
import { SubmitRequestProvider } from "./contexts/SubmitRequest";

if (window && window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
}

const chains =
    process.env.REACT_APP_ENV === "development" ? [baseGoerli] : [base];

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const config = createConfig(
    getDefaultConfig({
        chains,
        walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
        appName: "Skylab-Btt",
        appUrl: "https://app.projmercury.io", // your app's url
        appIcon: "https://app.projmercury.io/tournament.jpg", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

root.render(
    <Box sx={{ height: "100%" }}>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
            <Global styles={GlobalStyles} />
            <BrowserRouter>
                <WagmiConfig config={config}>
                    <ConnectKitProvider>
                        <BlockNumberProvider>
                            <SubmitRequestProvider>
                                <Fragment>
                                    <ScrollToTop />
                                    <HelmetProvider>
                                        <AppRoutes />
                                    </HelmetProvider>
                                </Fragment>
                            </SubmitRequestProvider>
                        </BlockNumberProvider>
                    </ConnectKitProvider>
                </WagmiConfig>
            </BrowserRouter>
        </ChakraProvider>
    </Box>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
