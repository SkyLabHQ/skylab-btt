import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Image,
    keyframes,
} from "@chakra-ui/react";
import React from "react";
import { ReactComponent as BorderBg } from "./assets/border.svg";
import WLight from "./assets/w-light.svg";
import TutorialIcon from "./assets/tutorial.svg";
import ApyUpIcon from "./assets/apy-up.svg";
import A1 from "./assets/a1.png";
import { LButton } from "../Button/Index";

const rotateKeyframes = keyframes`
    0% {
        transform: rotate(0deg);
     }
    100% {
        transform: rotate(360deg);
     }
`;

const ChooseTeamModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay backdropFilter={"blur(35px)"} />
            <ModalContent
                bg="rgba(0, 0, 0, 0.5)"
                border="1px solid #FDDC2D"
                borderRadius="8px"
                maxW={isPc ? "800px" : "300px"}
            >
                <ModalBody pb="20px" pt={"20px"}>
                    <Flex
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                        flexDir={"column"}
                        align={"center"}
                    >
                        <Text
                            fontSize={isPc ? "24px" : "20px"}
                            fontWeight="700"
                            fontFamily={"Orbitron"}
                            textAlign={"center"}
                            sx={{
                                color: "#fff",
                            }}
                        >
                            CHOOSE YOUR FAVOURITE TEAM FIRST
                        </Text>
                        <Box>
                            <Flex
                                sx={{
                                    width: "168px",
                                    height: "168px",
                                    position: "relative",
                                }}
                                align={"center"}
                                justify={"center"}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        left: "0",
                                        top: "0",
                                        "&:hover": {
                                            svg: {
                                                color: "#F2D861",
                                            },
                                        },
                                    }}
                                    animation={`${rotateKeyframes} 8s linear infinite `}
                                >
                                    <BorderBg
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    ></BorderBg>
                                </Box>
                                <Box
                                    sx={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "50%",
                                        border: "2px solid #FDDC2D",
                                    }}
                                ></Box>
                            </Flex>
                        </Box>
                        <Flex
                            sx={{
                                background: `url(${WLight}) no-repeat center center`,
                                width: "127px",
                                height: "131px",
                                lineHeight: 1,
                            }}
                            flexDir={"column"}
                            align={"center"}
                        >
                            <Image
                                src={TutorialIcon}
                                sx={{
                                    width: "14px",
                                    height: "14px",
                                    marginTop: "30px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "900",
                                    textAlign: "center",
                                }}
                            >
                                TEAM PREMIUM APY{" "}
                            </Text>
                            <Text
                                sx={{
                                    color: "#24FF00",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                }}
                            >
                                XXX{" "}
                                <span
                                    style={{
                                        fontSize: "12px",
                                    }}
                                >
                                    %
                                </span>{" "}
                                <Image
                                    src={ApyUpIcon}
                                    sx={{
                                        display: "inline-block",
                                        width: "9px",
                                    }}
                                ></Image>
                            </Text>
                        </Flex>
                        <Box
                            sx={{
                                marginTop: "40px",
                            }}
                        >
                            <Image
                                src={A1}
                                sx={{
                                    width: "80px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                Lvl.{" "}
                                <span
                                    style={{
                                        fontSize: "24px",
                                    }}
                                >
                                    1
                                </span>
                            </Text>
                        </Box>
                        <LButton
                            sx={{
                                width: "272px",
                                height: "62px",
                                marginTop: "10px",
                            }}
                        >
                            <Text
                                sx={{
                                    color: "#fff",
                                    fontSize: "18px",
                                    fontWeight: "700",
                                }}
                            >
                                Join
                            </Text>
                        </LButton>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ChooseTeamModal;
