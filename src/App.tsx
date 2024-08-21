import "swiper/css/bundle";
import { Box, Image, Flex } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useSkyToast from "./hooks/useSkyToast";
import Service from "./pages/Service";
import AddToHome from "./pages/AddToHome";
import TermPage from "./components/TermPage";
import { UserInfoProvider, useUserInfo } from "./contexts/UserInfo";
import CloseIcon from "@/assets/close.svg";
import qs from "query-string";
import useSkyMediaQuery from "./hooks/useSkyMediaQuery";
import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from "viem/chains";

const themeColorList = [
    {
        link: "/",
        color: "#1b1b1b",
    },
    {
        link: "/btt/game",
        color: "#1b1b1b",
    },
    {
        link: "/btt/live",
        color: "#1b1b1b",
    },
    {
        link: "/btt/playback",
        color: "#303030",
    },
    {
        link: "/btt/history",
        color: "#303030",
    },
    {
        link: "/activity",
        color: "transparent",
    },
];

const App = (): ReactElement => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const [type, setType] = useState(-1);
    const toast = useSkyToast();
    const [checked, setChecked] = useState(false);
    const [showTerm, setShowTerm] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // TODO
    // const { blockOpen, handleBlock } = useUserInfo();

    const handleEnter = () => {
        if (checked) {
            localStorage.setItem("service", "true");
            setType(0);
            navigate("/");
        } else {
            toast("Please agree to the Terms of Service.");
        }
    };

    const handleSkip = () => {
        setType(0);
    };

    const handleContinue = () => {
        const agree = localStorage.getItem("term");
        if (agree === "true") {
            setShowTerm(false);
        }
    };

    // useEffect(() => {
    //     const isTg = sessionStorage.getItem("isTg");
    //     const agree = localStorage.getItem("service");
    //     if (isPc || window.ethereum || params.tg || isTg) {
    //         if (params.tg || isTg) {
    //             sessionStorage.setItem("isTg", "true");
    //         }
    //         setType(0);
    //         return;
    //     }

    //     // 手机浏览器模式
    //     if (!window.matchMedia("(display-mode: standalone)").matches) {
    //         if (location.pathname === "/") {
    //             setType(2);
    //         } else {
    //             setType(0);
    //         }
    //         return;
    //     }

    //     //手机pwa模式  且同意service
    //     if (
    //         window.matchMedia("(display-mode: standalone)").matches &&
    //         agree === "true" &&
    //         !isPc
    //     ) {
    //         setType(0);
    //         return;
    //     }

    //     //手机pwa模式  不同意service
    //     if (
    //         window.matchMedia("(display-mode: standalone)").matches &&
    //         !agree &&
    //         !isPc
    //     ) {
    //         setType(1);
    //         return;
    //     }
    // }, [isPc]);

    // useEffect(() => {
    //     const metaThemeColor = document.querySelector("meta[name=theme-color]");
    //     const item = themeColorList.find(
    //         (item) => item.link === location.pathname,
    //     );
    //     // 动态修改meta标签的content属性
    //     if (metaThemeColor && item) {
    //         metaThemeColor.setAttribute("content", item.color);
    //     }
    // }, [location.pathname]);

    // useEffect(() => {
    //     const localStorageTerm = localStorage.getItem("term");
    //     if (localStorageTerm === "true") {
    //         setShowTerm(false);
    //     } else {
    //         setShowTerm(true);
    //     }
    // }, [showTerm]);

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
        // TO-DO: use color mode when implementing light/dark
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
            <Box
                minH="100%"
                color="white"
                height={"100%"}
                sx={{
                    position: "relative",
                }}
            >
                <UserInfoProvider>
                    <Outlet></Outlet>
                </UserInfoProvider>
                {/* {showTerm && <TermPage onContinue={handleContinue}></TermPage>}
            {!showTerm && (
                <>
                    {type === 0 && <Outlet />}
                    {type === 1 && (
                        <Service
                            checked={checked}
                            onChecked={setChecked}
                            onEnter={handleEnter}
                        ></Service>
                    )}
                    {type === 2 && <AddToHome onSkip={handleSkip}></AddToHome>}
                </>
            )}
            {blockOpen && (
                <Flex
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        background: "#F2D861",
                        width: "100%",
                        color: "#000",
                        zIndex: 999,
                        height: "50px",
                        alignItems: "center",
                        fontSize: isPc ? "16px" : "10px",
                        fontFamily: "Quantico",
                        fontWeight: "bold",
                        padding: isPc ? "0 36px" : "0 12px",
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        Bid Tac Toe Tournament is unavailable in your country It
                        appears that you are connected from an unsupported
                        jurisdiction. For more information, please read our{" "}
                        <span
                            style={{
                                textDecoration: "underline",
                                marginLeft: "5px",
                            }}
                            onClick={() => {
                                window.open(
                                    "https://docs.google.com/document/d/1Tq04jfFTmyVzwto8BYtlBh9U9iZ7_Lsp4muaKudnQAA/edit#heading=h.dbtsmhujsl04",
                                    "_blank",
                                );
                            }}
                        >
                            {" "}
                            Terms of Services
                        </span>
                    </Box>
                    <Image
                        onClick={() => {
                            handleBlock(false);
                        }}
                        src={CloseIcon}
                        sx={{
                            width: isPc ? "18px" : "12px",
                            height: isPc ? "18px" : "12px",
                            cursor: "pointer",
                        }}
                    ></Image>
                </Flex>
            )} */}
            </Box>
        </PrivyProvider>
    );
};

export default App;
