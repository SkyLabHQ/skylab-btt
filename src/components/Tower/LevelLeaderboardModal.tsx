import React, { useEffect } from "react";
import {
    Text,
    Modal,
    ModalBody,
    ModalContent,
    Image,
    ModalOverlay,
    useMediaQuery,
    Flex,
    Box,
    SimpleGrid,
    useClipboard,
} from "@chakra-ui/react";
import AmountBg from "./assets/amount-bg.png";
import useSkyToast from "@/hooks/useSkyToast";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import AvatarBg from "./assets/avatar-bg.png";
import DefaultAvatar from "./assets/default-avatar.png";
import CopyIcon from "@/assets/copy-icon.svg";
import { aviationImg } from "@/utils/aviationImg";
import LevelDetailBg from "./assets/level-detail.png";
import Winner from "./assets/winner.png";
import CloseIcon from "@/assets/close.png";

const NewComer = () => {
    const toast = useSkyToast();
    const { onCopy } = useClipboard("12345");

    const handleCopy = () => {
        onCopy();
        toast("Address copied");
    };

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Flex
                justify={"center"}
                align={"center"}
                sx={{
                    width: "241px",
                    height: "132px",
                    background: `url(${Winner})`,
                    backgroundSize: "100% 100%",
                    // borderRadius: "50%",
                    position: "relative",
                }}
            >
                <Image
                    src={DefaultAvatar}
                    sx={{
                        width: "50px",
                    }}
                ></Image>
            </Flex>
            <Box
                sx={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: "14px",
                    border: "1px solid #FFF",
                    width: "112px",
                    borderRadius: "16px",
                    height: "28px",
                    lineHeight: "28px",
                    background: "rgba(0,0,0,0.5)",
                    marginTop: "-5px",
                    zIndex: -1,
                }}
            >
                0x12345
            </Box>
            <Flex
                onClick={handleCopy}
                sx={{
                    marginTop: "10px",
                    cursor: "pointer",
                }}
            >
                <Text
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    0x123...456
                </Text>
                <Image
                    src={CopyIcon}
                    sx={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "4px",
                    }}
                ></Image>
            </Flex>
        </Flex>
    );
};

const InfoItem = ({ detail }: { detail: any }) => {
    const toast = useSkyToast();
    const { onCopy } = useClipboard("12345");

    const handleCopy = () => {
        onCopy();
        toast("Address copied");
    };

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Flex
                justify={"center"}
                align={"center"}
                sx={{
                    width: "102px",
                    height: "102px",
                    background: `url(${AvatarBg})`,
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    backgroundColor: "rgb(38,38,38)",
                    position: "relative",
                }}
            >
                <Image
                    src={DefaultAvatar}
                    sx={{
                        width: "50%",
                    }}
                ></Image>
                <Flex
                    sx={{
                        background: `url(${AmountBg})`,
                        backgroundSize: "100% 100%",
                        width: "28px",
                        height: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0%",
                    }}
                    justify={"center"}
                    align={"center"}
                >
                    <Box
                        sx={{
                            verticalAlign: "bottom",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "12px",
                            }}
                        >
                            x
                        </span>
                        <span
                            style={{
                                fontSize: "16px",
                            }}
                        >
                            123
                        </span>
                    </Box>
                </Flex>
            </Flex>
            <Box
                sx={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: "14px",
                    border: "1px solid #FFF",
                    width: "112px",
                    borderRadius: "16px",
                    height: "28px",
                    lineHeight: "28px",
                    background: "rgba(0,0,0,0.5)",
                    marginTop: "-5px",
                    zIndex: -1,
                }}
            >
                0x12345
            </Box>
            <Flex
                onClick={handleCopy}
                sx={{
                    marginTop: "10px",
                    cursor: "pointer",
                }}
            >
                <Text
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    0x123...456
                </Text>
                <Image
                    src={CopyIcon}
                    sx={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "4px",
                    }}
                ></Image>
            </Flex>
        </Flex>
    );
};

const LevelLeaderboardModal = ({
    list,
    isOpen,
    onClose,
}: {
    list: any[];
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [loading, setLoading] = React.useState(false);
    const toast = useSkyToast();

    const handleGetList = async () => {
        if (list.length === 0) {
            setLoading(false);
            return;
        }
    };

    useEffect(() => {}, [isOpen, list]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent
                width={"800px"}
                maxWidth={"800px"}
                containerProps={{
                    sx: {
                        "&:focus-visible": {
                            outline: "none",
                        },
                    },
                }}
                bg="rgba(255, 255, 255, 0.15)"
                border="2px solid #FDDC2D"
                borderRadius="16px"
                sx={{
                    color: "#fff",
                    backdropFilter: "blur(33.97852325439453px)",
                }}
            >
                <ModalBody
                    pb="0"
                    pt={"20px"}
                    sx={{
                        position: "relative",
                    }}
                >
                    <Image
                        src={aviationImg(4)}
                        sx={{
                            position: "absolute",
                            top: "0px",
                            width: "240px",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            textAlign: "right",
                            fontSize: "20px",
                        }}
                    >
                        Total {list.length}
                    </Text>
                    <Text
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "30px",
                            }}
                        >
                            Lvl.
                        </span>{" "}
                        <span
                            style={{
                                fontSize: "50px",
                            }}
                        >
                            4
                        </span>
                    </Text>
                    <Box
                        sx={{
                            overflow: "auto",
                            height: "600px",
                        }}
                    >
                        <Box
                            sx={{
                                background: `url(${LevelDetailBg}) no-repeat`,
                                backgroundPosition: "bottom",
                                width: "100%",
                                height: "300px",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: "100px",
                                    right: "100px",
                                    // transform: "translateX()",
                                }}
                            >
                                <NewComer></NewComer>
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: "60px",
                                    left: "20%",
                                }}
                            >
                                <InfoItem detail={{}}></InfoItem>{" "}
                            </Box>
                        </Box>
                        <SimpleGrid
                            columns={5}
                            sx={{
                                marginTop: "40px",
                            }}
                        >
                            {[1, 2, 3].map((item, index) => {
                                return (
                                    <InfoItem
                                        detail={item}
                                        key={index}
                                    ></InfoItem>
                                );
                            })}
                            {/* {list.map((item, index) => {
                            return (
                                <Flex>
                                    <Box
                                        sx={{
                                            width: "102px",
                                            height: "102px",
                                            background: `url(${AvatarBg})`,
                                            backgroundSize: "cover",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        头像
                                    </Box>
                                </Flex>
                            );
                        })} */}
                        </SimpleGrid>
                    </Box>
                </ModalBody>
                <Image
                    onClick={() => {
                        onClose();
                    }}
                    src={CloseIcon}
                    sx={{
                        width: "30px",
                        height: "30px",
                        position: "absolute",
                        right: "0",
                        top: "-48px",
                        cursor: "pointer",
                    }}
                ></Image>
            </ModalContent>
        </Modal>
    );
};

export default LevelLeaderboardModal;
