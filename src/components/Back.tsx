import React from "react";
import BackIcon from "@/assets/back-arrow.svg";
import BackIcon1 from "@/assets/back.svg";
import { Flex, Image } from "@chakra-ui/react";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const Back = ({ onClick }: { onClick?: () => void }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
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
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
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
