import {
    Box,
    Text,
    Image,
    Input,
    InputRightElement,
    InputGroup,
    Button,
    Flex,
} from "@chakra-ui/react";
import EditIcon from "./assets/edit.svg";
import BackIcon from "./assets/back.svg";
import React, { useState } from "react";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import { useWalletClient } from "wagmi";
import LobbyInfo from "./LobbyInfo";
import Loading from "../Loading";
import avatars from "@/skyConstants/avatars";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { getPrivateLobbySigner } from "@/hooks/useSigner";

const NickName = ({
    nickname,
    onChangeNickname,
}: {
    nickname: string;
    onChangeNickname: (nickname: string) => void;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                marginTop: "6.875vw",
            }}
        >
            <Text
                sx={{
                    width: "7.8125vw",
                    fontSize: "1.25vw",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                }}
            >
                Nick Name
            </Text>
            <InputGroup
                sx={{
                    width: "20.3125vw",
                    height: "3.125vw",
                    borderRadius: "0.2604vw",
                    paddingLeft: "0.5208vw",
                    background: "#787878",
                    boxShadow:
                        "0.2083vw 0.2083vw 0.3229vw 0vw rgba(255, 255, 255, 0.25)",
                    padding: "0 1.0417vw",
                }}
            >
                <Input
                    variant={"unstyled"}
                    value={nickname}
                    sx={{
                        fontSize: "1.25vw",
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
                        width: "5.2083vw",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.25vw",
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
    return (
        <Box
            sx={{
                width: "5.4167vw",
                height: "5.4167vw",
                borderRadius: "1.1458vw",
                position: "relative",
                border: "1px solid #FDDC2D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "5vw",
                    height: "5vw",
                    border: "1px solid #FDDC2D",
                    borderRadius: "1.1458vw",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        width: "3.8542vw",
                        height: "3.8542vw",
                        borderRadius: "0.5208vw",
                        background: avatars[avatarIndex],
                    }}
                ></Box>
                <Image
                    src={EditIcon}
                    sx={{
                        position: "absolute",
                        right: "0",
                        bottom: "0",
                        width: "2.5vw",
                        height: "2.5vw",
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
    return (
        <Box
            sx={{
                paddingLeft: "7.8125vw",
                marginTop: "2.0833vw",
            }}
        >
            <Box
                sx={{
                    width: "28.125vw",
                    display: "flex",
                    flexWrap: "wrap",
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
                                width: "3.75vw",
                                height: "3.75vw",
                                background: item,
                                borderRadius: "0.5208vw",
                                cursor: "pointer",
                                margin: "0 0.9375vw 0.9375vw 0",
                            }}
                        ></Box>
                    );
                })}
            </Box>
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
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"name" | "avatar">("name");
    const { lobbyAddress, avatarIndex, nickname, handleStepChange } =
        usePrivateLobbyContext();
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);

    const toast = useSkyToast();

    const handleSetUserInfo = async () => {
        try {
            setLoading(true);
            const privateLobbySigner = getPrivateLobbySigner();

            await bttPrivateLobbyContract(
                "setUserInfo",
                [avatarIndex + 1, nickname],
                {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                },
            );
            handleStepChange(1);
            setLoading(false);
        } catch (e) {
            console.log(e);
            toast(handleError(e));
        }
    };

    return (
        <Flex
            justify={"center"}
            flexDir={"column"}
            sx={{
                width: "71.1458vw",
                margin: "0 auto",
                height: "100vh",
            }}
        >
            {loading && <Loading></Loading>}
            <Text
                sx={{
                    fontSize: "1.25vw",
                }}
            >
                Your Profile in Private Lobby
            </Text>
            <Box
                sx={{
                    border: "2px solid #FFF",
                    padding: "5.2083vw 15.625vw ",
                    borderRadius: "0.5208vw",
                    marginTop: "1.875vw",
                    position: "relative",
                    height: "30.9375vw",
                }}
            >
                {mode === "avatar" && (
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
                        alignItems: "center",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.25vw",
                            width: "7.8125vw",
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
                {mode === "name" && (
                    <NickName
                        nickname={nickname}
                        onChangeNickname={onNicknameChange}
                    ></NickName>
                )}
                {mode === "avatar" && (
                    <Avatar
                        onAvatarChange={(color: number) => {
                            onAvatarChange(color);
                            setMode("name");
                        }}
                    ></Avatar>
                )}
            </Box>
            <LobbyInfo></LobbyInfo>
            <Flex justify={"center"}>
                <Button
                    onClick={handleSetUserInfo}
                    variant={"outline"}
                    sx={{
                        border: "0.1563vw solid #FFF",
                        width: "14.0625vw",
                        height: "3.3854vw",
                        fontSize: "1.25vw",
                        borderRadius: "0.9375vw",
                        marginTop: "3.9583vw",
                    }}
                >
                    Confirm
                </Button>
            </Flex>
        </Flex>
    );
};

export default Profile;
