import { Box, Image, Flex, Text, Input, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import LeftArrow from "./assets/left-arrow.png";
import { shortenAddress } from "@/utils";
import CopyIcon from "@/assets/copy-icon.svg";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import MyPilot from "../MyPilot";
import { useUserInfoRequest } from "@/contexts/UserInfo";

const UserInfo = () => {
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfoRequest();

    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                borderBottom: "1px dashed #fff",
                paddingBottom: "20px",
            }}
        >
            <MyPilot imgUrl={activePilot.img} width={"80px"}></MyPilot>

            <Flex
                sx={{
                    marginTop: "8px",
                }}
                align={"center"}
            ></Flex>
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
            <Text
                sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    marginTop: "20px",
                    fontFamily: "Orbitron",
                }}
            >
                Edit Nickname
            </Text>
        </Flex>
    );
};

const EditNickname = ({
    userName,
    onSetUserName,
    onChangeMode,
}: {
    userName: string;
    onChangeMode: (mode: number) => void;
    onSetUserName: (userName: string) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { address } = usePrivyAccounts();
    const [nickname, setNickname] = React.useState("");
    return (
        <Flex
            sx={{
                paddingBottom: "110px",
            }}
            flexDir={"column"}
            justifyContent={"space-between"}
        >
            <Box>
                <Flex
                    align={"center"}
                    sx={{
                        height: isPc ? "30px" : "16px",
                    }}
                >
                    <Image
                        onClick={() => onChangeMode(0)}
                        src={LeftArrow}
                        sx={{
                            width: "24px",
                        }}
                    ></Image>
                </Flex>
                <UserInfo></UserInfo>
                <Box
                    sx={{
                        paddingTop: isPc ? "30px" : "15px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "20px" : "16px",
                        }}
                    >
                        Current Nickname
                    </Text>
                    <Box
                        sx={{
                            height: isPc ? "30px" : "15px",
                            marginTop: "15px",
                            fontSize: isPc ? "24px" : "18px",
                        }}
                    >
                        {userName
                            ? userName
                            : `${shortenAddress(address, 4, 4)}`}{" "}
                    </Box>

                    <Box
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        <Text sx={{ fontSize: isPc ? "20px" : "16px" }}>
                            In-put New Nickname
                        </Text>
                        <Input
                            variant={"unstyled"}
                            sx={{
                                width: "100%",
                                height: "40px",
                                background: "#D9D9D9",
                                marginTop: "15px",
                                fontSize: "20px",
                                color: "#000",
                                paddingLeft: "10px",
                            }}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        ></Input>
                    </Box>
                </Box>
            </Box>

            <Flex
                onClick={() => {
                    onSetUserName(nickname);
                }}
                align={"center"}
                justify={"center"}
                sx={{
                    background: nickname ? "#F2D861" : "#777",
                    height: isPc ? "64px" : "40px",
                    width: isPc ? "280px" : "180px",
                    borderRadius: isPc ? "24px" : "12px",
                    fontSize: isPc ? "28px" : "14px",
                    fontWeight: 700,
                    color: nickname ? "#1b1b1b" : "#999",
                    margin: "28px auto 0",
                    backdropFilter: "blur(6.795704364776611px)",
                    fontFamily: "Orbitron",
                    cursor: nickname ? "pointer" : "not-allowed",
                }}
            >
                Confirm
            </Flex>
        </Flex>
    );
};
export default EditNickname;
