import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import TipIcon from "./assets/tip.svg";
import NoPlane from "@/assets/no-plane.png";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { useChainId } from "wagmi";
import BiddingGif from "@/assets/bidding.gif";
import PlaneBgSelect from "./assets/plane-bg-select.png";
import PlaneBg from "@/assets/plane-bg.png";
import { useUserInfo } from "@/contexts/UserInfo";

const SelectPlane = ({
    selectPlane,
    onSelectPlane,
}: {
    selectPlane: any;
    onSelectPlane: (plane: any) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { planeInit, planeList } = useUserInfo();
    const { address } = usePrivyAccounts();

    return (
        <Box>
            <Flex justify={"center"} align={"center"}>
                <Image
                    src={TipIcon}
                    sx={{
                        marginRight: "4px",
                    }}
                ></Image>
                <Text
                    sx={{
                        color: "#F2D861",
                        fontSize: "20px",
                        fontFamily: "Quantico",
                    }}
                >
                    Please select plane first
                </Text>
            </Flex>
            <Box
                sx={{
                    borderRadius: "18px 18px 0 0",
                    border: "1px solid #FFF",
                    borderBottom: "none",
                    height: isPc
                        ? "calc(100vh - 400px)"
                        : "calc(100vh - 250px)",
                    marginTop: "10px",
                    overflow: "auto",
                }}
            >
                <Flex
                    flexDir={"column"}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "30px" : "20px",
                            textAlign: "center",
                            marginTop: "20px",
                            fontFamily: "Orbitron",
                            fontWeight: "bold",
                        }}
                    >
                        Select Planes
                    </Text>

                    {address && (
                        <Box
                            sx={{
                                marginTop: "20px",
                                height: "100%",
                            }}
                        >
                            {!planeInit ? (
                                <SimpleGrid
                                    columns={isPc ? 4 : 3}
                                    sx={{
                                        position: "relative",
                                    }}
                                    spacingY={"30px"}
                                >
                                    {new Array(isPc ? 4 : 3)
                                        .fill("")
                                        .map((item, index) => {
                                            return (
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                    key={index}
                                                >
                                                    <Image
                                                        src={BiddingGif}
                                                    ></Image>
                                                </Box>
                                            );
                                        })}
                                </SimpleGrid>
                            ) : planeList.length > 0 ? (
                                <SimpleGrid
                                    columns={isPc ? 4 : 3}
                                    spacingY={"20px"}
                                >
                                    {planeList.map((detail, index) => {
                                        const isSelected =
                                            selectPlane?.tokenId ===
                                            detail.tokenId;
                                        return (
                                            <Flex
                                                key={index}
                                                flexDir={"column"}
                                                align={"center"}
                                                onClick={() => {
                                                    onSelectPlane(detail);
                                                }}
                                                sx={{
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Text
                                                    sx={{
                                                        fontSize: isPc
                                                            ? "16px"
                                                            : "14px",
                                                    }}
                                                >
                                                    #{detail.tokenId}
                                                </Text>
                                                <Box
                                                    sx={{
                                                        width: isPc
                                                            ? "100px"
                                                            : "60px",
                                                        height: isPc
                                                            ? "100px"
                                                            : "60px",
                                                        background: `url(${
                                                            isSelected
                                                                ? PlaneBgSelect
                                                                : PlaneBg
                                                        }) no-repeat`,
                                                        backgroundSize:
                                                            "100% 100%",
                                                        position: "relative",
                                                        marginTop: isPc
                                                            ? "6px"
                                                            : "3px",
                                                    }}
                                                >
                                                    {detail.state && (
                                                        <Box
                                                            sx={{
                                                                width: isPc
                                                                    ? "80px"
                                                                    : "60px",
                                                                height: isPc
                                                                    ? "20px"
                                                                    : "16px",
                                                                borderRadius:
                                                                    isPc
                                                                        ? "100px"
                                                                        : "6px",
                                                                border: "1px solid #000",
                                                                color: "#F2D861",
                                                                textAlign:
                                                                    "center",
                                                                fontFamily:
                                                                    "Quantico",
                                                                fontSize: isPc
                                                                    ? "14px"
                                                                    : "10px",
                                                                background:
                                                                    "#000",
                                                                position:
                                                                    "absolute",
                                                                top: "0px",
                                                                left: "50%",
                                                                transform:
                                                                    "translate(-50%, 0)",
                                                            }}
                                                        >
                                                            In-Game
                                                        </Box>
                                                    )}
                                                    <Image
                                                        src={detail.img}
                                                        sx={{
                                                            width: "180%",
                                                            maxWidth: "180%",
                                                            position:
                                                                "absolute",
                                                            left: "50%",
                                                            top: "50%",
                                                            transform:
                                                                "translate(-50%,-50%)",
                                                        }}
                                                    ></Image>
                                                </Box>
                                                <Text
                                                    sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Lvl.{" "}
                                                    <span
                                                        style={{
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {detail.level}
                                                    </span>
                                                </Text>
                                                <Box
                                                    sx={{
                                                        width: isPc
                                                            ? "130px"
                                                            : "90px",
                                                        height: isPc
                                                            ? "13px"
                                                            : "10px",
                                                        padding: "2px",
                                                        border: "1px solid #FFF",
                                                        borderRadius: "12px",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width:
                                                                ((detail.points -
                                                                    detail.prePoints) /
                                                                    (detail.nextPoints -
                                                                        detail.prePoints)) *
                                                                    100 +
                                                                "%",
                                                            height: "100%",
                                                            background: "#fff",
                                                            borderRadius:
                                                                "12px",
                                                        }}
                                                    ></Box>
                                                </Box>
                                                <Text
                                                    sx={{
                                                        fontSize: isPc
                                                            ? "16px"
                                                            : "12px",
                                                    }}
                                                >
                                                    Next Lvl:
                                                </Text>
                                                <Text
                                                    sx={{
                                                        fontSize: isPc
                                                            ? "16px"
                                                            : "12px",
                                                    }}
                                                >
                                                    {detail.points}/
                                                    <span
                                                        style={{
                                                            color: "#CCC",
                                                        }}
                                                    >
                                                        {detail.nextPoints}
                                                        pt
                                                    </span>
                                                </Text>
                                            </Flex>
                                        );
                                    })}
                                </SimpleGrid>
                            ) : (
                                <Flex>
                                    <Image
                                        src={NoPlane}
                                        sx={{
                                            width: "200px",
                                            margin: "50px auto",
                                        }}
                                    ></Image>
                                </Flex>
                            )}
                        </Box>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};

export default SelectPlane;
