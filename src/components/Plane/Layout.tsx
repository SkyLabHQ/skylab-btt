import { Box, Image, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackIcon from "./assets/back.svg";
import LogoIcon from "./assets/logo.svg";
import UserLogin from "../UserLogin";
import CartIcon from "./assets/cart.svg";

const Header = () => {
    const [large680] = useMediaQuery("(min-width: 680px)");

    const navigate = useNavigate();
    return (
        <Flex
            sx={{
                height: large680 ? "80px" : "40px",
                background: "#F2D861",
                padding: large680 ? "0 30px" : "0 12px",
                position: "relative",
            }}
            justify={"space-between"}
            align={"center"}
        >
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <Image
                    onClick={() => {
                        navigate("/");
                    }}
                    src={BackIcon}
                    sx={{
                        width: large680 ? "40px" : "24px",
                        cursor: "pointer",
                    }}
                ></Image>
            </Box>

            {large680 && (
                <Image
                    src={LogoIcon}
                    sx={{
                        width: "54px",
                        position: "absolute",
                        left: "50%",
                        bottom: "0%",
                        transform: "translateX(-50%)",
                    }}
                ></Image>
            )}
            <Flex
                sx={{
                    flex: 1,
                }}
                justify={"flex-end"}
            >
                <UserLogin></UserLogin>
            </Flex>
        </Flex>
    );
};

const navList = [
    {
        label: "BUY",
        value: "/plane/market",
    },
    {
        label: "SELL",
        value: "/plane/my",
    },
];

const NavBar = () => {
    const [large680] = useMediaQuery("(min-width: 680px)");

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = React.useState(0);

    useEffect(() => {
        const navIndex = navList.findIndex((nav) => nav.value === pathname);
        setActiveIndex(navIndex);
    }, [pathname]);

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
                paddingTop: large680 ? "50px" : "20px",
            }}
        >
            <Flex justify={"center"}>
                <Image
                    src={CartIcon}
                    sx={{
                        width: large680 ? "54px" : "22px",
                        marginRight: "10px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: large680 ? "50px" : "22px",
                        fontStyle: "normal",
                        fontWeight: "bold",
                    }}
                >
                    PLANE MARKET
                </Text>
            </Flex>
            <Flex
                sx={{
                    gap: "20px",
                    marginTop: large680 ? "6px" : "24px",
                }}
            >
                {navList.map((nav, index) => {
                    return (
                        <Flex
                            onClick={() => {
                                navigate(nav.value);
                            }}
                            key={index}
                            align={"center"}
                            justify={"center"}
                            sx={{
                                textAlign: "center",
                                padding: "10px",
                                background:
                                    activeIndex === index
                                        ? "#F2D861"
                                        : "#A49136",
                                border:
                                    activeIndex === index
                                        ? "2px solid #000"
                                        : "2px solid #F2D861",
                                width: large680 ? "228px" : "130px",
                                height: large680 ? "55px" : "30px",
                                borderRadius: "16px",
                                cursor: "pointer",
                                color: activeIndex === index ? "#000" : "#fff",
                                fontSize: large680 ? "24px" : "14px",
                                fontFamily: "Orbitron",
                            }}
                        >
                            {nav.label}
                        </Flex>
                    );
                })}
            </Flex>
        </Box>
    );
};

const PlaneMarketLayout = () => {
    const [large1700] = useMediaQuery("(min-width: 1700px)");
    const [large1360] = useMediaQuery("(min-width: 1360px)");
    const [large1020] = useMediaQuery("(min-width: 1020px)");
    const [large680] = useMediaQuery("(min-width: 680px)");

    return (
        <Box
            sx={{
                minHeight: "100%",
                background: "#CEA029",
                color: "white",
            }}
        >
            <Header></Header>
            <Box
                sx={{
                    maxWidth: "1700px",
                    width: large1700
                        ? "1700px"
                        : large1360
                        ? "1360px"
                        : large1020
                        ? "1020px"
                        : large680
                        ? "680px"
                        : "100%",
                    margin: "0px auto",
                }}
            >
                <Box
                    sx={{
                        margin: "0 10px",
                    }}
                >
                    <NavBar></NavBar>
                </Box>
                <Box
                    sx={{
                        marginTop: large680 ? "30px" : "20px",
                    }}
                >
                    <Outlet></Outlet>
                </Box>
            </Box>
        </Box>
    );
};

export default PlaneMarketLayout;
