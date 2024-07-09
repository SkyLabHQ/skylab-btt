import { Box, Image, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Back, { BackWithText } from "../Back";
import BackIcon from "./assets/back.svg";
import LogoIcon from "./assets/logo.svg";
import UserLogin from "../UserLogin";
import CartIcon from "./assets/cart.svg";

const Header = () => {
    return (
        <Flex
            sx={{
                height: "80px",
                background: "#F2D861",
                padding: "0 30px",
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
                    src={BackIcon}
                    sx={{
                        width: "40px",
                    }}
                ></Image>
            </Box>

            <Flex
                sx={{
                    flex: 1,
                }}
                justify={"center"}
            >
                {" "}
                <Image
                    src={LogoIcon}
                    sx={{
                        width: "40px",
                    }}
                ></Image>
            </Flex>
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
        label: "Market",
        value: "/plane/market",
    },
    {
        label: "My Plane",
        value: "/plane/my",
    },
];

const NavBar = () => {
    const { pathname } = useLocation();
    const [activeIndex, setActiveIndex] = React.useState(0);

    useEffect(() => {
        const navIndex = navList.findIndex((nav) => nav.value === pathname);
        console.log(pathname, navIndex, "navIndex");
        setActiveIndex(navIndex);
    }, [pathname]);

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
            }}
        >
            <Flex justify={"center"}>
                <Image
                    src={CartIcon}
                    sx={{
                        width: "54px",
                        marginRight: "10px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: "50px",
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
                }}
            >
                {navList.map((nav, index) => {
                    return (
                        <Flex
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
                                width: "228px",
                                height: "55px",
                                borderRadius: "16px",
                                cursor: "pointer",
                                color: activeIndex === index ? "#000" : "#fff",
                                fontSize: "24px",
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
    return (
        <Box
            sx={{
                height: "100vh",
                background: "#CEA029",
                color: "white",
            }}
        >
            <Header></Header>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </Box>
    );
};

export default PlaneMarketLayout;
