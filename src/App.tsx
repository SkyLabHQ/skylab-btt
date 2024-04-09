import "swiper/css/bundle";
import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useSkyToast from "./hooks/useSkyToast";
import Service from "./pages/Service";
import AddToHome from "./pages/AddToHome";
import TermPage from "./components/TermPage";
import { useUserInfoRequest } from "./contexts/UserInfo";

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
        link: "/btt/joinlobby",
        color: "#303030",
    },
    {
        link: "/btt/lobby",
        color: "#303030",
    },
    {
        link: "/btt/lobbyRoom",
        color: "#1b1b1b",
    },
    {
        link: "/btt/lobbyPlayback",
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
    { link: "/btt/lobbyLive", color: "#1b1b1b" },
    {
        link: "/activity",
        color: "transparent",
    },
];

const App = (): ReactElement => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [type, setType] = useState(-1);
    const toast = useSkyToast();
    const [checked, setChecked] = useState(false);
    const [showTerm, setShowTerm] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isBlock } = useUserInfoRequest();

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

    useEffect(() => {
        const agree = localStorage.getItem("service");
        if (isPc || window.ethereum) {
            setType(0);
            return;
        }

        // 手机浏览器模式
        if (!window.matchMedia("(display-mode: standalone)").matches) {
            if (location.pathname === "/") {
                setType(2);
            } else {
                setType(0);
            }
            return;
        }

        //手机pwa模式  且同意service
        if (
            window.matchMedia("(display-mode: standalone)").matches &&
            agree === "true" &&
            !isPc
        ) {
            setType(0);
            return;
        }

        //手机pwa模式  不同意service
        if (
            window.matchMedia("(display-mode: standalone)").matches &&
            !agree &&
            !isPc
        ) {
            setType(1);
            return;
        }
    }, [isPc]);

    useEffect(() => {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        const item = themeColorList.find(
            (item) => item.link === location.pathname,
        );
        // 动态修改meta标签的content属性
        if (metaThemeColor && item) {
            metaThemeColor.setAttribute("content", item.color);
        }
    }, [location.pathname]);

    useEffect(() => {
        const localStorageTerm = localStorage.getItem("term");
        if (localStorageTerm === "true") {
            setShowTerm(false);
        } else {
            setShowTerm(true);
        }
    }, [showTerm]);

    return (
        // TO-DO: use color mode when implementing light/dark
        <Box
            minH="100%"
            color="white"
            height={"100%"}
            sx={{
                position: "relative",
            }}
        >
            {showTerm && <TermPage onContinue={handleContinue}></TermPage>}
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
            {isBlock && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        background: "#F2D861",
                        width: "100%",
                        color: "#000",
                        zIndex: 999,
                        height: "50px",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: isPc ? "16px" : "10px",
                        fontFamily: "Quantico",
                        fontWeight: "bold",
                        padding: "12px",
                        textAlign: "center",
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
            )}
        </Box>
    );
};

export default App;
