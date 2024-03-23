import React from "react";
import BackIcon from "@/assets/back-arrow.svg";
import BackIcon1 from "@/assets/back.svg";

import { Flex, Image, useMediaQuery } from "@chakra-ui/react";

const Back = ({ onClick }: { onClick?: () => void }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex flexDir={"column"} align={"center"} onClick={onClick}>
            <Image
                src={BackIcon}
                sx={{
                    width: isPc ? "2.0833vw" : "32px",
                    cursor: "pointer",
                }}
            ></Image>
        </Flex>
    );
};

export const BackWithText = ({
    onClick,
    textContent,
}: {
    onClick?: () => void;
    textContent: React.ReactNode;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            onClick={onClick}
            sx={{
                cursor: "pointer",
            }}
        >
            <Image
                src={BackIcon1}
                sx={{
                    width: isPc ? "40px" : "32px",
                }}
            ></Image>
            {textContent}
        </Flex>
    );
};

export default Back;
