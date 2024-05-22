import {
    Box,
    Flex,
    Image,
    Input,
    SimpleGrid,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import TipIcon from "./assets/tip.svg";
import NoPlane from "@/assets/no-plane.png";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import BiddingGif from "@/assets/bidding.gif";
import PlaneBgSelect from "./assets/plane-bg-select.png";
import PlaneBg from "@/assets/plane-bg.png";
import BuyIcon from "./assets/buy-icon.svg";
import { useUserInfo } from "@/contexts/UserInfo";
import { accMul, parseAmount } from "@/utils/formatBalance";
import { useState } from "react";
import AddIcon from "./assets/add.svg";
import SubIcon from "./assets/sub.svg";
import PlanetIcon from "./assets/planet.png";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { usePublicClient } from "wagmi";

const BuyButton = ({
    inputAmount,
    onBuy,
}: {
    inputAmount: number;
    onBuy: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex
            onClick={onBuy}
            sx={{
                width: "200px",
                height: "40px",
                borderRadius: "12px",
                background: "#f2d861",
                fontSize: isPc ? "16px" : "10px",
                padding: "0 12px",
                marginTop: "10px",
                color: "#000",
                cursor: "pointer",
                "&:hover .unHover": {
                    display: "none",
                },
                "&:hover .activeHover": {
                    display: "flex",
                },
            }}
            align={"center"}
        >
            <Flex
                className="unHover"
                align={"center"}
                justify={"center"}
                sx={{
                    width: "100%",
                }}
            >
                <Text
                    sx={{
                        marginRight: "3px",
                        textAlign: "center",
                    }}
                >
                    {accMul("0.02", inputAmount.toString())} ETH
                </Text>
            </Flex>
            <Flex
                className="activeHover"
                align={"center"}
                justify={"center"}
                sx={{
                    width: "100%",
                    display: "none",
                }}
            >
                <Flex>
                    <Image
                        src={BuyIcon}
                        sx={{
                            width: isPc ? "12px" : "8px",
                            marginRight: "5px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontFamily: "Quantico",
                        }}
                    >
                        BUY
                    </Text>
                </Flex>

                <Box
                    sx={{
                        width: "1px",
                        height: "16px",
                        background: "#1b1b1b",
                        margin: "0 10px",
                    }}
                ></Box>
                <Text
                    sx={{
                        marginRight: "3px",
                    }}
                >
                    {accMul("0.02", inputAmount.toString())} ETH
                </Text>
            </Flex>
        </Flex>
    );
};

const SelectPlane = ({
    selectPlane,
    onSelectPlane,
}: {
    selectPlane: any;
    onSelectPlane: (plane: any) => void;
}) => {
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { planeInit, planeList, handleLogin, handleGetUserPaper } =
        useUserInfo();
    const { address } = usePrivyAccounts();
    const [inputAmount, setInputAmount] = useState(1);
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const publicClient = usePublicClient();

    const handleMintPlane = async () => {
        try {
            const hash = await mercuryJarTournamentContract.write.mint(
                [inputAmount],
                {
                    value: parseAmount(accMul("0.02", inputAmount.toString())),
                },
            );
            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }

            handleGetUserPaper();
        } catch (e) {
            console.log(e, "e");
            toast(handleError(e));
        }
    };

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
                        ? "calc(100vh - 380px)"
                        : "calc(100vh - 250px)",
                    marginTop: "10px",
                    overflow: "auto",
                }}
            >
                {address ? (
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
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
                                                                position:
                                                                    "relative",
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
                                            {planeList.map(
                                                (
                                                    detail: any,
                                                    index: number,
                                                ) => {
                                                    const isSelected =
                                                        selectPlane?.tokenId ===
                                                        detail.tokenId;
                                                    return (
                                                        <Flex
                                                            key={index}
                                                            flexDir={"column"}
                                                            align={"center"}
                                                            onClick={() => {
                                                                onSelectPlane(
                                                                    detail,
                                                                );
                                                            }}
                                                            sx={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <Text
                                                                sx={{
                                                                    fontSize:
                                                                        isPc
                                                                            ? "16px"
                                                                            : "14px",
                                                                }}
                                                            >
                                                                #
                                                                {detail.tokenId}
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
                                                                    position:
                                                                        "relative",
                                                                    marginTop:
                                                                        isPc
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
                                                                            fontSize:
                                                                                isPc
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
                                                                    src={
                                                                        detail.img
                                                                    }
                                                                    sx={{
                                                                        width: "180%",
                                                                        maxWidth:
                                                                            "180%",
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
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize:
                                                                        "12px",
                                                                }}
                                                            >
                                                                Lvl.{" "}
                                                                <span
                                                                    style={{
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                >
                                                                    {
                                                                        detail.level
                                                                    }
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
                                                                    padding:
                                                                        "2px",
                                                                    border: "1px solid #FFF",
                                                                    borderRadius:
                                                                        "12px",
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
                                                                        background:
                                                                            "#fff",
                                                                        borderRadius:
                                                                            "12px",
                                                                    }}
                                                                ></Box>
                                                            </Box>
                                                            <Text
                                                                sx={{
                                                                    fontSize:
                                                                        isPc
                                                                            ? "16px"
                                                                            : "12px",
                                                                }}
                                                            >
                                                                Next Lvl:
                                                            </Text>
                                                            <Text
                                                                sx={{
                                                                    fontSize:
                                                                        isPc
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
                                                                    {
                                                                        detail.nextPoints
                                                                    }
                                                                    pt
                                                                </span>
                                                            </Text>
                                                        </Flex>
                                                    );
                                                },
                                            )}
                                        </SimpleGrid>
                                    ) : (
                                        <Flex
                                            flexDirection={"column"}
                                            align={"center"}
                                            sx={{
                                                paddingBottom: "100px",
                                            }}
                                        >
                                            <Image
                                                src={NoPlane}
                                                sx={{
                                                    width: "200px",
                                                    margin: "3vh auto",
                                                }}
                                            ></Image>

                                            <Image
                                                src={PlanetIcon}
                                                sx={{
                                                    width: isPc
                                                        ? "90px"
                                                        : "60px",
                                                    height: isPc
                                                        ? "90px"
                                                        : "60px",
                                                }}
                                            ></Image>
                                            <Flex
                                                justify={"space-between"}
                                                sx={{
                                                    width: isPc
                                                        ? "170px"
                                                        : "120px",
                                                    borderRadius: isPc
                                                        ? "30px"
                                                        : "20px",
                                                    background:
                                                        "rgba(0, 0, 0, 0.60)",
                                                    padding: "2px",
                                                    margin: "0 auto",
                                                    height: isPc
                                                        ? "38px"
                                                        : "30px",
                                                    marginTop: "9px",
                                                    border: "1px solid #F2D861",
                                                }}
                                            >
                                                <Flex
                                                    sx={{
                                                        width: isPc
                                                            ? "32px"
                                                            : "24px",
                                                        height: isPc
                                                            ? "32px"
                                                            : "24px",
                                                        background:
                                                            inputAmount > 1
                                                                ? "#F2D861"
                                                                : "#777",
                                                        borderRadius: "50%",
                                                        color: "#1B1B1B",
                                                    }}
                                                    justify={"center"}
                                                    align={"center"}
                                                    onClick={() => {
                                                        if (inputAmount > 1) {
                                                            setInputAmount(
                                                                inputAmount - 1,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Image
                                                        src={SubIcon}
                                                        sx={{
                                                            width: "16px",
                                                        }}
                                                    ></Image>
                                                </Flex>
                                                <Input
                                                    variant={"unstyled"}
                                                    sx={{
                                                        flex: 1,
                                                        textAlign: "center",
                                                        color: "#fff",
                                                        fontSize: isPc
                                                            ? "20px"
                                                            : "16px",
                                                    }}
                                                    value={inputAmount}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value.replace(
                                                                /[^0-9]/g,
                                                                "",
                                                            );
                                                        setInputAmount(
                                                            Number(value),
                                                        );
                                                    }}
                                                ></Input>
                                                <Flex
                                                    sx={{
                                                        width: isPc
                                                            ? "32px"
                                                            : "24px",
                                                        height: isPc
                                                            ? "32px"
                                                            : "24px",
                                                        background: "#F2D861",
                                                        borderRadius: "50%",
                                                        color: "#1B1B1B",
                                                    }}
                                                    justify={"center"}
                                                    align={"center"}
                                                    onClick={() => {
                                                        setInputAmount(
                                                            inputAmount + 1,
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        src={AddIcon}
                                                        sx={{
                                                            width: "16px",
                                                        }}
                                                    ></Image>
                                                </Flex>
                                            </Flex>
                                            <BuyButton
                                                inputAmount={inputAmount}
                                                onBuy={handleMintPlane}
                                            ></BuyButton>
                                        </Flex>
                                    )}
                                </Box>
                            )}
                        </Flex>
                    </Box>
                ) : (
                    <Flex
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                        flexDir={"column"}
                        align={"center"}
                        justify={"center"}
                    >
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
                                Please connect wallet first
                            </Text>
                        </Flex>
                        <Flex
                            onClick={handleLogin}
                            sx={{
                                width: "288px",
                                height: "62px",
                                background: "#f2d861",
                                borderRadius: "20px",
                                color: "#1B1B1B",
                                fontFamily: "Orbitron",
                                fontSize: "28px",
                                fontWeight: "bold",
                                marginTop: "16px",
                                cursor: "pointer",
                            }}
                            align={"center"}
                            justify={"center"}
                        >
                            Connect Wallet
                        </Flex>
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

export default SelectPlane;
