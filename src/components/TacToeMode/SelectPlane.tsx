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
            align={"center"}
            flexDir={"column"}
            justify={"center"}
            sx={{
                height: "100%",
                borderTop: "1px dashed #fff",
            }}
        >
            <Flex
                onClick={handleMintPlane}
                sx={{
                    height: "54px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    color: "#F2D861",
                    cursor: "pointer",
                    position: "relative",
                    border: "1px solid #f2d861",
                    padding: isPc
                        ? "12px 10px 12px 30px"
                        : "12px 10px 12px 12px",
                }}
                align={"center"}
            >
                <Text
                    sx={{
                        fontSize: isPc ? "18px" : "14px",
                        fontWeight: 700,
                        fontFamily: "Orbitron",
                    }}
                >
                    Mint Plane
                </Text>
                <Box
                    sx={{
                        width: "1px",
                        height: "30px",
                        background: "#F2D861",
                        margin: isPc ? "0 20px" : "0 12px",
                    }}
                ></Box>
                <Text
                    sx={{
                        fontSize: isPc ? "20px" : "14px",
                        textAlign: "right",
                        fontWeight: 900,
                        fontFamily: "Helvetica",
                        marginRight: isPc ? "10px" : "6px",
                    }}
                >
                    0.01 ETH
                </Text>
                <Image
                    src={Level1Plane}
                    sx={{
                        width: isPc ? "100px" : "50px",
                    }}
                ></Image>
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
    const { address } = usePrivyAccounts();
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
                height: "100%",
            }}
        >
            <Flex
                flexDir={"column"}
                sx={{
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "45px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "30px" : "20px",
                            textAlign: "center",
                            paddingTop: "20px",
                            fontFamily: "Orbitron",
                            fontWeight: "bold",
                        }}
                    >
                        {address && "Select Planes"}
                    </Text>
                </Box>

                <Box
                    sx={{
                        marginTop: "20px",
                        height: isPc
                            ? "calc(100% - 100px)"
                            : "calc(100% - 100px)",
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
                    {address ? (
                        <>
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
                                                    <Image
                                                        src={BiddingGif}
                                                    ></Image>
                                                </Box>
                                            );
                                        })}
                                </SimpleGrid>
                            )}
                            {!planetLoading && planeList.length > 0 && (
                                <SimpleGrid
                                    columns={isPc ? 4 : 3}
                                    spacingY={"20px"}
                                >
                                    {planeList.map(
                                        (detail: any, index: number) => {
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
                                                            position:
                                                                "relative",
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
                                                            src={detail.img}
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
                                                            fontWeight: "bold",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        Lvl.{" "}
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "16px",
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
                                        },
                                    )}
                                </SimpleGrid>
                            )}
                        </>
                    ) : (
                        <ConnectWalletBt></ConnectWalletBt>
                    )}
                </Box>
                <Box
                    sx={{
                        height: "140px",
                        position: "absolute",
                        left: "50%",
                        bottom: 0,
                        width: "calc(100% - 100px)",
                        transform: "translateX(-50%)",
                    }}
                >
                    {!planetLoading && address && (
                        <MintPlane
                            handleMintPlane={handleMintPlane}
                        ></MintPlane>
                    )}
                </Box>
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
        <Box
            sx={{
                height: "100%",
            }}
        >
            <Box
                sx={{
                    height: "30px",
                }}
            >
                {address && (
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
                )}
            </Box>

            <Box
                sx={{
                    borderRadius: "18px 18px 0 0",
                    border: "1px solid #FFF",
                    borderBottom: "none",
                    paddingTop: "10px",
                    height: "calc(100% - 30px)",
                }}
            >
                <MyPlane
                    selectPlane={selectPlane}
                    onSelectPlane={onSelectPlane}
                ></MyPlane>
            </Box>
        </Box>
    );
};

export default SelectPlane;
