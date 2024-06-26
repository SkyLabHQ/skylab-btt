import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import TipIcon from "./assets/tip.svg";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import BiddingGif from "@/assets/bidding.gif";
import PlaneBgSelect from "./assets/plane-bg-select.png";
import PlaneBg from "@/assets/plane-bg.png";
import { useUserInfo } from "@/contexts/UserInfo";
import { parseAmount } from "@/utils/formatBalance";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { usePublicClient } from "wagmi";
import Level1Plane from "@/assets/aviations/a1.png";

const MintPlane = ({ handleMintPlane }: { handleMintPlane: () => void }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Flex
            sx={{
                height: "140px",
                position: "absolute",
                left: "50%",
                bottom: 0,
                width: "calc(100% - 100px)",
                borderTop: "1px dashed #fff",
                transform: "translateX(-50%)",
            }}
            align={"center"}
            flexDir={"column"}
            justify={"center"}
        >
            <Flex
                onClick={handleMintPlane}
                sx={{
                    width: isPc ? "380px" : "210px",
                    height: "54px",
                    borderRadius: "12px",
                    background: "#f2d861",
                    fontSize: "16px",
                    color: "#000",
                    cursor: "pointer",
                    position: "relative",
                }}
                align={"center"}
            >
                <Image
                    src={Level1Plane}
                    sx={{
                        position: "absolute",
                        right: isPc ? "-50px" : "-25px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: isPc ? "100px" : "50px",
                    }}
                ></Image>
                <Text
                    sx={{
                        flex: 1,
                        fontSize: isPc ? "24px" : "14px",
                        fontWeight: 700,
                        color: "#1B1B1B",
                        fontFamily: "Orbitron",
                        padding: "0 10px",
                    }}
                >
                    Mint Plane
                </Text>
                <Box
                    sx={{
                        width: "1px",
                        height: "30px",
                        background: "#1B1B1B",
                    }}
                ></Box>
                <Text
                    sx={{
                        flex: 1,
                        fontSize: isPc ? "30px" : "14px",
                        textAlign: "right",
                        fontWeight: 900,
                        color: "#1B1B1B",
                        fontFamily: "Helvetica-Condensed-Black-Se",
                        marginRight: isPc ? "40px" : "24px",
                    }}
                >
                    0.01 ETH
                </Text>
            </Flex>
        </Flex>
    );
};

const ConnectWalletBt = () => {
    const { handleLogin } = useUserInfo();
    return (
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
    );
};

const MyPlane = ({
    selectPlane,
    onSelectPlane,
}: {
    selectPlane: any;
    onSelectPlane: (plane: any) => void;
}) => {
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const {
        planeList,
        handleGetUserPaper,
        loading: planetLoading,
    } = useUserInfo();
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const publicClient = usePublicClient();

    const handleMintPlane = async () => {
        try {
            const hash = await mercuryJarTournamentContract.write.mint([1], {
                value: parseAmount("0.02"),
            });
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
        <Box
            sx={{
                width: "100%",
                padding: "0 12px 140px",
                position: "relative",
            }}
        >
            <Flex flexDir={"column"}>
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

                <Box
                    sx={{
                        marginTop: "20px",
                        height: isPc
                            ? "calc(100vh - 680px)"
                            : "calc(100vh - 450px)",
                        paddingBottom: "20px",
                        overflow: "auto",
                        "&::-webkit-scrollbar-thumb": {
                            background: "#8C8C8C",
                            margin: "10px",
                            borderRadius: "10px",
                        },
                        "::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            display: "none",
                        },
                    }}
                >
                    {planetLoading && (
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
                                            <Image src={BiddingGif}></Image>
                                        </Box>
                                    );
                                })}
                        </SimpleGrid>
                    )}
                    {!planetLoading && planeList.length > 0 && (
                        <SimpleGrid columns={isPc ? 4 : 3} spacingY={"20px"}>
                            {planeList.map((detail: any, index: number) => {
                                const isSelected =
                                    selectPlane?.tokenId === detail.tokenId;
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
                                                width: isPc ? "100px" : "60px",
                                                height: isPc ? "100px" : "60px",
                                                background: `url(${
                                                    isSelected
                                                        ? PlaneBgSelect
                                                        : PlaneBg
                                                }) no-repeat`,
                                                backgroundSize: "100% 100%",
                                                position: "relative",
                                                marginTop: isPc ? "6px" : "3px",
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
                                                        borderRadius: isPc
                                                            ? "100px"
                                                            : "6px",
                                                        border: "1px solid #000",
                                                        color: "#F2D861",
                                                        textAlign: "center",
                                                        fontFamily: "Quantico",
                                                        fontSize: isPc
                                                            ? "14px"
                                                            : "10px",
                                                        background: "#000",
                                                        position: "absolute",
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
                                                    position: "absolute",
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
                                                width: isPc ? "130px" : "90px",
                                                height: isPc ? "13px" : "10px",
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
                                                    borderRadius: "12px",
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
                    )}
                </Box>
                {!planetLoading && (
                    <MintPlane handleMintPlane={handleMintPlane}></MintPlane>
                )}
            </Flex>
        </Box>
    );
};

const SelectPlane = ({
    selectPlane,
    onSelectPlane,
}: {
    selectPlane: any;
    onSelectPlane: (plane: any) => void;
}) => {
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
                    marginTop: "10px",
                }}
            >
                {address ? (
                    <MyPlane
                        selectPlane={selectPlane}
                        onSelectPlane={onSelectPlane}
                    ></MyPlane>
                ) : (
                    <ConnectWalletBt></ConnectWalletBt>
                )}
            </Box>
        </Box>
    );
};

export default SelectPlane;
