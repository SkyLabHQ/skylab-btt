import { Box, Image, Flex, Text, Input } from "@chakra-ui/react";
import React from "react";
import LeftArrow from "./assets/left-arrow.png";
import { shortenAddress } from "@/utils";
import CopyIcon from "@/assets/copy-icon.svg";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import DeafaultIcon from "./assets/default-icon.png";

const UserInfo = () => {
    const { user } = usePrivy();
    const { address } = usePrivyAccounts();
    console.log(user, "user");

    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                borderBottom: "1px dashed #fff",
                paddingBottom: "20px",
            }}
        >
            <Image
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
    onChangeMode,
}: {
    onChangeMode: (mode: number) => void;
}) => {
    const [nickname, setNickname] = React.useState("");
    return (
        <Flex
            sx={{
                height: "100%",
                paddingBottom: "110px",
            }}
            flexDir={"column"}
            justifyContent={"space-between"}
        >
            <Box>
                <Flex
                    align={"center"}
                    sx={{
                        height: "30px",
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
                        paddingTop: "30px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        Current Nickname
                    </Text>
                    <Box
                        sx={{
                            height: "30px",
                        }}
                    ></Box>

                    <Box>
                        <Text sx={{ fontSize: "20px" }}>
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
                align={"center"}
                justify={"center"}
                sx={{
                    background: "#F2D861",
                    height: "64px",
                    width: "280px",
                    borderRadius: "24px",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#1b1b1b",
                    margin: "0 auto",
                    backdropFilter: "blur(6.795704364776611px)",
                    fontFamily: "Orbitron",
                }}
            >
                Confirm
            </Flex>
        </Flex>
    );
};
export default EditNickname;
