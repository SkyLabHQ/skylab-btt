import { Box, Text, Image, Flex } from "@chakra-ui/react";
import PlaneBorder from "./assets/plane-border.png";
import NoPlane from "./assets/no-plane.png";
import { useUserInfo } from "@/contexts/UserInfo";

const CurrentPlane = ({ selectPlane }: { selectPlane: any }) => {
    const { handleLogin, address } = useUserInfo();

    return (
        <Box onClick={() => {}}>
            <Text
                sx={{
                    color: address ? "#f2d861" : "#fff",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                {address ? "Current Plane" : "Not Conncet Wallet yet"}
            </Text>
            <Flex
                onClick={() => {
                    if (address) {
                        return;
                    }

                    handleLogin();
                }}
                sx={{
                    background: `url(${PlaneBorder})`,
                    width: "262px",
                    height: "192px",
                    backgroundSize: "100%",
                    marginTop: "20px",
                    position: "relative",
                    cursor: address ? "normal" : "pointer",
                }}
                justify={"center"}
                align={"center"}
            >
                {selectPlane?.tokenId ? (
                    <Box sx={{}}>
                        <Image
                            src={selectPlane.img}
                            sx={{
                                width: "200px",
                            }}
                        ></Image>
                    </Box>
                ) : (
                    <Image
                        src={NoPlane}
                        sx={{
                            width: "80px",
                        }}
                    ></Image>
                )}

                {selectPlane.tokenId && (
                    <>
                        <Text
                            sx={{
                                position: "absolute",
                                bottom: "10px",
                            }}
                        >
                            Lvl. {selectPlane.level}
                        </Text>
                        <Flex
                            sx={{
                                position: "absolute",
                                bottom: "-50px",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                                width: "100%",
                            }}
                            flexDirection={"column"}
                            align={"center"}
                        >
                            <Box
                                sx={{
                                    width: "130px",
                                    height: "13px",
                                    padding: "2px",
                                    border: "1px solid #FFF",
                                    borderRadius: "12px",
                                }}
                            >
                                <Box
                                    sx={{
                                        width:
                                            ((selectPlane.points -
                                                selectPlane.prePoints) /
                                                (selectPlane.nextPoints -
                                                    selectPlane.prePoints)) *
                                                100 +
                                            "%",
                                        height: "100%",
                                        background: "#fff",
                                        borderRadius: "12px",
                                    }}
                                ></Box>
                            </Box>
                            <Text
                                sx={{
                                    fontSize: "16px",
                                }}
                            >
                                Next Lvl:
                                <span
                                    style={{
                                        color: "#CCC",
                                    }}
                                >
                                    {selectPlane.nextPoints -
                                        selectPlane.points}
                                    pt
                                </span>
                            </Text>
                        </Flex>
                    </>
                )}
            </Flex>
        </Box>
    );
};

export default CurrentPlane;
