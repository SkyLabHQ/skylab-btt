import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    Text,
    Image,
    DrawerOverlay,
    useDisclosure,
    Flex,
} from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import CopyIcon from "@/assets/copy-icon.svg";
import SettingIcon from "./assets/setting.png";
import QuitIcon from "./assets/quit.png";
import DeafaultIcon from "./assets/default-icon.png";
import RightArrowIcon from "./assets/right-arrow.svg";
import { usePrivy } from "@privy-io/react-auth";
import EditIcon from "./assets/edit.svg";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { shortenAddress } from "@/utils";
import PaperIcon from "./assets/paper.png";
import GrayArrow from "./assets/gray-arrow.svg";
import { aviationImg } from "@/utils/aviationImg";
import NoPlane from "./assets/no-plane.png";
import DiscordIcon from "./assets/discord.png";
import TwIcon from "./assets/twitter.png";
import EditNickname from "./EditNickname";
import SetPilot from "./SetPilot";

const UserInfo = ({
    onChangeMode,
}: {
    onChangeMode: (mode: number) => void;
}) => {
    const { user } = usePrivy();
    const { address } = usePrivyAccounts();
    console.log(user, "user");

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Image
                onClick={() => {
                    onChangeMode(2);
                }}
                src={DeafaultIcon}
                sx={{
                    width: "78px",
                }}
            ></Image>
            <Flex
                sx={{
                    marginTop: "8px",
                }}
                align={"center"}
            >
                {user?.discord && (
                    <Image
                        src={DiscordIcon}
                        sx={{
                            width: "16px",
                            marginRight: "4px",
                        }}
                    ></Image>
                )}
                {user?.twitter && (
                    <Image
                        src={TwIcon}
                        sx={{
                            width: "16px",
                            marginRight: "4px",
                        }}
                    ></Image>
                )}

                <Text
                    sx={{
                        color: "#F2D861",
                        marginRight: "6px",
                    }}
                >
                    昵称
                </Text>
                <Image
                    onClick={() => {
                        onChangeMode(1);
                    }}
                    src={EditIcon}
                    sx={{
                        width: "14px",
                    }}
                ></Image>
            </Flex>
            <Flex
                sx={{
                    marginTop: "11px",
                    fontSize: "14px",
                }}
            >
                <Text
                    sx={{
                        fontSize: "14px",
                        marginRight: "11px",
                    }}
                >
                    {shortenAddress(address, 5, 4)}
                </Text>
                <Image
                    src={CopyIcon}
                    sx={{
                        width: "14px",
                    }}
                ></Image>
            </Flex>
        </Flex>
    );
};

const MyPaper = () => {
    return (
        <Box
            sx={{
                marginTop: "30px",
            }}
        >
            <Box
                sx={{
                    borderBottom: "1px dashed  #fff",
                    paddingBottom: "8px",
                }}
            >
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: "18px",
                    }}
                >
                    Paper
                </Text>
            </Box>
            <Flex flexDir={"column"} align={"center"}>
                <Image
                    src={PaperIcon}
                    sx={{
                        width: "110px",
                        marginTop: "24px",
                    }}
                ></Image>
                <Flex
                    sx={{
                        borderRadius: "12px",
                        background: "#777",
                        height: "40px",
                        width: "180px",
                        paddingLeft: "8px",
                        marginTop: "15px",
                    }}
                    align={"center"}
                >
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: "#999",
                            marginRight: "5px",
                        }}
                    >
                        Fold A Paper Plane
                    </Text>
                    <Image src={GrayArrow}></Image>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Image
                            src={aviationImg(1)}
                            sx={{
                                position: "absolute",
                                left: "0",
                                top: 0,
                                width: "70px",
                                maxWidth: "70px",
                                transform: "translate(0,-50%)",
                            }}
                        ></Image>
                    </Box>
                </Flex>{" "}
                <Flex
                    sx={{
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.82)",
                        height: "40px",
                        width: "180px",
                        paddingLeft: "8px",
                        marginTop: "15px",
                        border: "1px solid #F2D861",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: "#777",
                        }}
                    >
                        You can only fold paper plane after Tournament Begins!
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

const MyPlane = () => {
    return (
        <Box
            sx={{
                marginTop: "30px",
            }}
        >
            <Box
                sx={{
                    borderBottom: "1px dashed  #fff",
                    paddingBottom: "8px",
                }}
            >
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: "18px",
                    }}
                >
                    Plane
                </Text>
            </Box>
            <Flex flexDir={"column"} align={"center"}>
                <Image
                    src={NoPlane}
                    sx={{
                        width: "140px",
                        marginTop: "58px",
                    }}
                ></Image>
            </Flex>
        </Box>
    );
};

const UserInfoDrawer = ({
    onClose,
    isOpen,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { user, logout } = usePrivy();

    const [placement, setPlacement] = React.useState("right");
    const [currentMode, setCurrentMode] = useState(2); // 0展示用户信息 1设置昵称 2设置pilot

    const handleChangeMode = (mode: number) => {
        setCurrentMode(mode);
    };

    return (
        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent
                sx={{
                    borderRadius: "20px",
                    border: "1px solid #F2D861",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(25px)",
                    position: "relative",
                    maxWidth: "375px",
                }}
            >
                <DrawerBody
                    sx={{
                        padding: "30px",
                        width: "375px !important",
                    }}
                >
                    <Image
                        src={RightArrowIcon}
                        sx={{
                            width: "24px",
                            top: "40px",
                            left: "-36px",
                            position: "absolute",
                        }}
                    ></Image>

                    {currentMode === 0 && (
                        <Box>
                            <Flex
                                justify={"flex-end"}
                                align={"center"}
                                sx={{
                                    height: "30px",
                                }}
                            >
                                <Image
                                    src={SettingIcon}
                                    sx={{
                                        marginRight: "22px",
                                        width: "24px",
                                    }}
                                ></Image>
                                <Image
                                    onClick={async () => {
                                        await logout();
                                        onClose();
                                    }}
                                    src={QuitIcon}
                                    sx={{
                                        width: "24px",
                                    }}
                                ></Image>
                            </Flex>
                            <UserInfo
                                onChangeMode={(mode: number) => {
                                    handleChangeMode(mode);
                                }}
                            ></UserInfo>
                            <MyPaper></MyPaper>
                            <MyPlane></MyPlane>
                        </Box>
                    )}
                    {currentMode === 1 && (
                        <EditNickname
                            onChangeMode={(mode: number) => {
                                handleChangeMode(mode);
                            }}
                        ></EditNickname>
                    )}
                    {currentMode === 2 && (
                        <SetPilot
                            onChangeMode={(mode: number) => {
                                handleChangeMode(mode);
                            }}
                        ></SetPilot>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default UserInfoDrawer;
