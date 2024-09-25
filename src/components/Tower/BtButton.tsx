import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import BtBg from "./assets/bt-bg.png";

import A1 from "./assets/a1.png";
import Play from "./assets/play.png";
const Button = ({
    onClick,
    children,
}: {
    onClick?: () => void;
    children?: React.ReactNode;
}) => {
    return (
        <Flex
            onClick={onClick}
            sx={{
                background: `url(${BtBg}) no-repeat`,
                width: "289px",
                height: "168px",
                backgroundSize: "100% 100%",
                cursor: "pointer",
            }}
            flexDir={"column"}
            align={"center"}
            justify={"flex-end"}
        >
            {children}
        </Flex>
    );
};

const BtButton = ({ onAvaitionClick }: { onAvaitionClick: () => void }) => {
    return (
        <Flex
            sx={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                gap: "16px",
            }}
        >
            <Button onClick={onAvaitionClick}>
                <Image
                    src={A1}
                    sx={{
                        width: "100px",
                    }}
                ></Image>
                <Text
                    sx={{
                        textAlign: "center",
                        fontSize: "40px",
                        fontWeight: 700,
                    }}
                >
                    BUY
                </Text>
            </Button>
            <Button>
                <Image
                    src={Play}
                    sx={{
                        width: "36px",
                    }}
                ></Image>
                <Text
                    sx={{
                        textAlign: "center",
                        fontSize: "40px",
                        fontWeight: 700,
                    }}
                >
                    PLAY
                </Text>
            </Button>
        </Flex>
    );
};

export default BtButton;
