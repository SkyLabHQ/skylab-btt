import { Box, Image, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const { pathname } = useLocation();
    const navigate = useNavigate();
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
                paddingTop: isPc ? "50px" : "20px",
            }}
        >
            <Flex justify={"center"}>
                <Image
                    src={CartIcon}
                    sx={{
                        width: isPc ? "54px" : "22px",
                        marginRight: "10px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: isPc ? "50px" : "22px",
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
                    marginTop: isPc ? "6px" : "24px",
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
                                width: isPc ? "228px" : "130px",
                                height: isPc ? "55px" : "30px",
                                borderRadius: "16px",
                                cursor: "pointer",
                                color: activeIndex === index ? "#000" : "#fff",
                                fontSize: isPc ? "24px" : "14px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                    margin: "0px auto",
                    padding: isPc ? "20px 10px" : "20px 10px",
                }}
            >
                <NavBar></NavBar>
                <Box
                    sx={{
                        marginTop: isPc ? "30px" : "20px",
                    }}
                >
                    <Outlet></Outlet>
                </Box>
            </Box>
        </Box>
    );
};

export default PlaneMarketLayout;
