import { Box, Image, Flex, Text, Input, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import LeftArrow from "./assets/left-arrow.png";
import { shortenAddress } from "@/utils";
import CopyIcon from "@/assets/copy-icon.svg";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

const UserInfo = () => {
    const { address } = usePrivyAccounts();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                borderBottom: "1px dashed #fff",
                paddingBottom: "20px",
            }}
        >
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
                    fontSize: isPc ? "24px" : "12px",
                    marginTop: isPc ? "26px" : "12px",
                    fontFamily: "Orbitron",
                    fontWeight: 700,
                }}
            >
                Set Username
            </Text>
        </Flex>
    );
};

const EditNickname = ({
    onSetUserName,
    onChangeMode,
}: {
    onChangeMode: (mode: number) => void;
    onSetUserName: (userName: string) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [nickname, setNickname] = React.useState("");
    return (
        <Flex
            sx={{
                paddingBottom: "110px",
                height: "100%",
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
                    <Box>
                        <Input
                            variant={"unstyled"}
                            sx={{
                                width: "100%",
                                height: "40px",
                                background: "#D9D9D9",
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
