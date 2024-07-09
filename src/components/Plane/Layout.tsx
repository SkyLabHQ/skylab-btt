import { Box, Image, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Back, { BackWithText } from "../Back";
import BackIcon from "./assets/back.svg";
import LogoIcon from "./assets/logo.svg";
import UserLogin from "../UserLogin";

const Header = () => {
    return (
        <Flex
            sx={{
                height: "80px",
                background: "#F2D861",
            }}
        >
            <Image
                src={BackIcon}
                sx={{
                    width: "40px",
                }}
            ></Image>
            <Image
                src={LogoIcon}
                sx={{
                    width: "40px",
                }}
            ></Image>
            <UserLogin></UserLogin>
        </Flex>
    );
};

const PlaneMarketLayout = () => {
    return (
        <Box>
            <Header></Header>
            <Outlet></Outlet>
        </Box>
    );
};

export default PlaneMarketLayout;
