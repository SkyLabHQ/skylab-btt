import {
    Box,
    Text,
    Image,
    Input,
    InputRightElement,
    InputGroup,
    Button,
    Flex,
    useMediaQuery,
    SimpleGrid,
} from "@chakra-ui/react";
import EditIcon from "./assets/edit.svg";
import BackIcon from "./assets/back.svg";
import React, { useState } from "react";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import { usePrivateLobbyContract } from "@/hooks/useRetryContract";
import LobbyInfo from "./LobbyInfo";
import Loading from "../Loading";
import avatars from "@/skyConstants/avatars";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useSubmitRequest } from "@/contexts/SubmitRequest";

const NickName = ({
    nickname,
    onChangeNickname,
}: {
    nickname: string;
    onChangeNickname: (nickname: string) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                display: "flex",
                marginTop: "6.875vw",
                alignItems: isPc && "center",
                flexDirection: isPc ? "row" : "column",
            }}
        >
            <Text
                sx={{
                    width: isPc ? "7.8125vw" : "120px",
                    fontSize: isPc ? "1.25vw" : "20px",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                }}
            >
                Nickname
            </Text>
            <InputGroup
                sx={{
                    width: isPc ? "20.3125vw" : "100%",
                    height: isPc ? "3.125vw" : "38px",
                    borderRadius: "0.2604vw",
                    paddingLeft: "0.5208vw",
                    background: "#787878",
                    padding: "0 1.0417vw",
                }}
            >
                <Input
                    variant={"unstyled"}
                    value={nickname}
                    sx={{
                        fontSize: isPc ? "1.25vw" : "20px",
                        border: "none",
                        color: "#fff",
                    }}
                    onChange={(e) => {
                        onChangeNickname(
                            e.target.value
                                .replace(/[^a-zA-Z0-9]/g, "")
                                .slice(0, 10),
                        );
                    }}
                />
                <InputRightElement
                    sx={{
                        height: "100%",
                        width: isPc ? "5.2083vw" : "54px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "1.25vw" : "20px",
                            color: "#FFF",
                            textAlign: "right",
                        }}
                    >
                        {nickname.length}/10
                    </Text>
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};

const CurrentAvatar = ({
    avatarIndex,
    onModeChange,
}: {
    avatarIndex: number;
    onModeChange: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                width: isPc ? "5.4167vw" : "74px",
                height: isPc ? "5.4167vw" : "74px",
                borderRadius: isPc ? "1.1458vw" : "8px",
                position: "relative",
                border: "1px solid #FDDC2D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: isPc ? "5vw" : "68px",
                    height: isPc ? "5vw" : "68px",
                    border: "1px solid #FDDC2D",
                    borderRadius: isPc ? "1.1458vw" : "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        width: isPc ? "3.8542vw" : "52px",
                        height: isPc ? "3.8542vw" : "52px",
                        borderRadius: isPc ? "0.5208vw" : "8px",
                        background: avatars[avatarIndex],
                    }}
                ></Box>
                <Image
                    src={EditIcon}
                    sx={{
                        position: "absolute",
                        right: "0",
                        bottom: "0",
                        width: isPc ? "2.5vw" : "35px",
                        height: isPc ? "2.5vw" : "35px",
                        transform: "translate(30%, 30%)",
                        cursor: "pointer",
                    }}
                    onClick={onModeChange}
                ></Image>
            </Box>
        </Box>
    );
};

const Avatar = ({
    onAvatarChange,
}: {
    onAvatarChange: (color: number) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                paddingLeft: isPc && "7.8125vw",
            }}
        >
            <SimpleGrid
                justifyContent={"space-between"}
                columns={6}
                spacingX={"12px"}
                spacingY={"16px"}
                sx={{
                    width: isPc && "28.125vw",
                    paddingTop: isPc ? "2.0833vw" : "20px",
                }}
            >
                {avatars.map((item, index) => {
                    return (
                        <Box
                            onClick={() => {
                                onAvatarChange(index);
                            }}
                            key={item}
                            sx={{
                                width: isPc ? "3.75vw" : "38px",
                                height: isPc ? "3.75vw" : "38px",
                                background: item,
                                borderRadius: isPc ? "0.5208vw" : "8px",
                                cursor: "pointer",
                            }}
                        ></Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

const Profile = ({
    onNicknameChange,
    onAvatarChange,
}: {
    onNicknameChange: (nickname: string) => void;
    onAvatarChange: (color: number) => void;
}) => {
    const { openLoading, closeLoading } = useSubmitRequest();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"name" | "avatar">("name");
    const { lobbyAddress, avatarIndex, nickname, handleStepChange } =
        usePrivateLobbyContext();
    const bttPrivateLobbyContract = usePrivateLobbyContract(lobbyAddress);

    const toast = useSkyToast();

    const handleSetUserInfo = async () => {
        try {
            if (nickname.length === 0) {
                toast("Please input nickname");
                return;
            }

            openLoading();
            const privateLobbySigner = getPrivateLobbySigner();

            await bttPrivateLobbyContract("setUserInfo", [
                avatarIndex + 1,
                nickname,
            ]);
            closeLoading();
            handleStepChange(1);
            setLoading(false);
        } catch (e) {
            closeLoading();
            console.log(e);
            toast(handleError(e));
        }
    };

    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                width: isPc ? "71.1458vw" : "100%",
                height: "100%",
                paddingTop: isPc ? "1.875vw" : "36px",
                margin: "0 auto",
            }}
        >
            {loading && <Loading></Loading>}
            {isPc && (
                <Text
                    sx={{
                        textAlign: "left",
                        fontSize: "0.8333vw",
                        width: "100%",
                    }}
                >
                    Your Profile in Private Lobby
                </Text>
            )}
            <Box
                sx={{
                    border: isPc ? "2px solid #FFF" : "1px solid #FFF",
                    padding: isPc ? "5.2083vw 15.625vw " : "20px 20px",
                    borderRadius: isPc ? "0.5208vw" : "8px",
                    position: "relative",
                    height: isPc && "30.9375vw",
                    width: "100%",
                }}
            >
                {isPc && mode === "avatar" && (
                    <Image
                        src={BackIcon}
                        sx={{
                            position: "absolute",
                            left: "1.25vw",
                            top: "0.625vw",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setMode("name");
                        }}
                    ></Image>
                )}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: isPc && "center",
                        flexDirection: isPc ? "row" : "column",
                    }}
                >
                    <Text
                        sx={{
                            width: isPc ? "7.8125vw" : "100px",
                            fontSize: isPc ? "1.25vw" : "20px",
                            fontWeight: "bold",
                        }}
                    >
                        PFP
                    </Text>
                    <CurrentAvatar
                        avatarIndex={avatarIndex}
                        onModeChange={() => {
                            setMode("avatar");
                        }}
                    ></CurrentAvatar>
                </Box>
                <Box
                    sx={{
                        height: !isPc && "112px",
                    }}
                >
                    {mode === "avatar" && (
                        <Avatar
                            onAvatarChange={(color: number) => {
                                onAvatarChange(color);
                                setMode("name");
                            }}
                        ></Avatar>
                    )}
                </Box>

                {(mode === "name" || !isPc) && (
                    <NickName
                        nickname={nickname}
                        onChangeNickname={onNicknameChange}
                    ></NickName>
                )}
            </Box>
            <Flex
                sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                }}
            >
                <LobbyInfo></LobbyInfo>
            </Flex>
            <Flex justify={"center"}>
                <Flex
                    onClick={handleSetUserInfo}
                    sx={{
                        cursor: "pointer",
                        border: "3px solid #FFF",
                        width: isPc ? "14.0625vw" : "160px",
                        height: isPc ? "3.3854vw" : "40px",
                        fontSize: isPc ? "1.25vw" : "20px",
                        borderRadius: isPc ? "0.9375vw" : "8px",
                        marginTop: "3.9583vw",
                    }}
                    justify={"center"}
                    align={"center"}
                >
                    Confirm
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Profile;
