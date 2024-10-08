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
import TutorialIcon from "@/assets/tutorial.svg";
import ApyUpIcon from "@/assets/apy-up.svg";
import A1 from "./assets/a1.png";
import { LButton } from "../Button/Index";
import WL from "./assets/w-l.svg";
import YL from "./assets/y-l.svg";
import WE from "./assets/w-e.svg";
import YE from "./assets/y-e.svg";
import XP from "@/assets/xp.svg";
import TutorirlIcon from "@/assets/tutorial.svg";
import EthIcon from "@/assets/eth.png";
import SelectTeam from "../League/SelectTeam";
import { leagueAddressList } from "@/utils/league";

const rotateKeyframes = keyframes`
    0% {
        transform: rotate(0deg);
     }
    100% {
        transform: rotate(360deg);
     }
`;

const RewardWrap = ({ amount }: { amount: number }) => {
    return (
        <Flex
            sx={{
                width: "168px",
                height: "168px",
                position: "relative",
                marginTop: "10px",
                "&:hover": {
                    ".n-l": {
                        background: `url(${YL})`,
                    },
                    ".xx": {
                        svg: {
                            color: "#F2D861",
                        },
                    },
                    ".eth": {
                        background: `url(${YE})`,
                    },
                    ".amount": {
                        color: "#F2D861",
                    },
                },
            }}
            align={"center"}
            justify={"center"}
        >
            <Box
                className="xx"
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: "0",
                    top: "0",
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
            <Flex
                className="n-l"
                sx={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    background: `url(${WL})`,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                }}
                align={"center"}
                justify={"center"}
                flexDir={"column"}
            >
                <Box
                    className="eth"
                    sx={{
                        width: "43px",
                        height: "55px",
                        background: `url(${WE})`,
                    }}
                ></Box>
                <Text
                    className="amount"
                    sx={{
                        textShadow:
                            "0px 7px 26.5px rgba(255, 255, 255, 0.58), 0px 3px 0px #4D4D4D",
                        fontFamily: "Quantico",
                        fontSize: "40px",
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    999
                </Text>
            </Flex>
        </Flex>
    );
};

const ChooseTeamModal = ({
    handleMint,
    isOpen,
    onClose,
}: {
    handleMint: (leader: string) => void;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
    };
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
                        <SelectTeam
                            activeIndex={activeIndex}
                            onActiveIndex={handleActiveIndex}
                        ></SelectTeam>
                        <Flex
                            gap={"46px"}
                            sx={{
                                marginTop: "40px",
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Text>CHAMPION</Text>
                                    <Text>WINS PAYOUT</Text>
                                </Box>
                                <RewardWrap amount={999}></RewardWrap>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    <Text
                                        sx={{
                                            fontSize: "18px",
                                        }}
                                    >
                                        PER.{" "}
                                        <Image
                                            src={XP}
                                            sx={{
                                                display: "inline-block",
                                                width: "27px",
                                            }}
                                        ></Image>
                                    </Text>
                                    <Text
                                        sx={{
                                            fontSize: "20px",
                                        }}
                                    >
                                        <Image
                                            src={TutorirlIcon}
                                            sx={{
                                                display: "inline-block",
                                                width: "16px",
                                                margin: "2px 5px 0 0",
                                            }}
                                        ></Image>
                                        PAYOUT
                                    </Text>
                                </Box>
                                <RewardWrap amount={999}></RewardWrap>
                            </Box>
                        </Flex>
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
                            onClick={() => {
                                handleMint(leagueAddressList[activeIndex]);
                            }}
                            sx={{
                                width: "272px",
                                height: "62px",
                                marginTop: "10px",
                            }}
                        >
                            <Flex justify={"center"} align={"center"}>
                                <Image
                                    src={EthIcon}
                                    sx={{
                                        width: "12px",
                                        marginRight: "10px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        color: "#fff",
                                        fontSize: "24px",
                                        fontWeight: "700",
                                    }}
                                >
                                    0.02
                                </Text>
                            </Flex>
                        </LButton>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ChooseTeamModal;
