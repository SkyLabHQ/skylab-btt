import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    Text,
    Image,
    DrawerOverlay,
    Flex,
    SimpleGrid,
    useClipboard,
    useDisclosure,
} from "@chakra-ui/react";
import CopyIcon from "@/assets/copy-icon.svg";
import QuitIcon from "./assets/quit.png";
import RightArrowIcon from "./assets/right-arrow.svg";
import DownArrowIcon from "./assets/down-arrow.png";
import { useLinkAccount, usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/utils";
import NoPlane from "./assets/no-plane.png";
import useSkyToast from "@/hooks/useSkyToast";
import PlaneBg from "./assets/plane-bg.png";
import { useUserInfo } from "@/contexts/UserInfo";
import BiddingGif from "@/assets/bidding.gif";
import TgIcon from "./assets/tg-icon.svg";
import ExportIcon from "./assets/export-icon.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { getTokensGame, updateUserInfo } from "@/api/tournament";
import { avatarImg } from "@/utils/avatars";
import Avatar from "../Avatar";
import { LButton } from "../Button/Index";
import EthIcon from "@/assets/eth.png";
import InviteIcon from "./assets/invite.png";
import { formatAmount, toFixed } from "@/utils/formatBalance";
import { aviationImg } from "@/utils/aviationImg";
import PaperIcon from "./assets/paper.png";
import MoreArrow from "./assets/more-arrow.svg";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import { useEffect, useState } from "react";
import { useLeagueTournamentContract } from "@/hooks/useContract";
import { handleError } from "@/utils/error";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { levelRanges } from "@/utils/level";
import ChooseTeamModal from "../Tower/ChooseTeamModal";

const UserInfo = ({
    ethBalance,
    referralReward,
}: {
    ethBalance: string;
    referralReward: string;
}) => {
    const { address, setTgInfo } = useUserInfo();

    const { user, exportWallet } = usePrivy();

    const { linkTelegram } = useLinkAccount({
        onSuccess: async (user, linkMethod, linkedAccount) => {
            const res = await updateUserInfo();
            const { userInfo } = res.data;
            const info = {
                ...userInfo,
                photoUrl: userInfo.photoUrl
                    ? userInfo.photoUrl
                    : avatarImg(user.wallet.address),
            };

            setTgInfo(info);
        },
        onError: (error, details) => {
            console.log(error, details, "link account error");
            // Any logic you'd like to execute after a user exits the link flow or there is an error
        },
    });

    const toast = useSkyToast();
    const { onCopy } = useClipboard(address);
    const { onCopy: onCopyReferral } = useClipboard(
        `${window.location.host}/tower?referral=${address}`,
    );

    const handleInvite = async () => {
        onCopyReferral();
    };

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Flex flexDir={"column"} align={"center"}>
                <Flex
                    sx={{
                        fontSize: "14px",
                        color: "#FFF",
                        marginTop: "8px",
                    }}
                    onClick={() => {
                        onCopy();
                        toast("Address copied");
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "14px",
                            marginRight: "11px",
                        }}
                    >
                        {`${shortenAddress(address, 4, 4)}`}
                    </Text>
                    <Image
                        src={CopyIcon}
                        sx={{
                            width: "14px",
                        }}
                    ></Image>
                </Flex>
                <Flex align={"center"}>
                    <Image
                        src={EthIcon}
                        sx={{
                            width: "14px",
                            marginRight: "2px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "32px",
                            fontStyle: "normal",
                            fontWeight: 700,
                        }}
                    >
                        {toFixed(formatAmount(ethBalance), 2)}
                    </Text>
                </Flex>
                <Box>
                    {!user?.telegram && (
                        <LButton
                            sx={{
                                width: "180px",
                                height: "40px",
                                color: "#fff",
                                marginTop: "20px",
                            }}
                        >
                            {" "}
                            <Flex
                                sx={{}}
                                onClick={async () => {
                                    linkTelegram();
                                }}
                                align={"center"}
                                justify={"center"}
                            >
                                <Text
                                    sx={{
                                        fontSize: "12px",
                                        color: "#fff",
                                        marginRight: "5px",
                                    }}
                                >
                                    Connect Telegram
                                </Text>

                                <Image
                                    src={TgIcon}
                                    sx={{
                                        width: "20px",
                                    }}
                                ></Image>
                            </Flex>
                        </LButton>
                    )}
                    <LButton
                        sx={{
                            width: "180px",
                            height: "40px",
                            color: "#fff",
                            marginTop: "20px",
                        }}
                    >
                        <Flex
                            sx={{}}
                            onClick={handleInvite}
                            align={"center"}
                            justify={"center"}
                        >
                            <Image
                                src={InviteIcon}
                                sx={{
                                    width: "20px",
                                    marginRight: "6px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: "12px",
                                    color: "#fff",
                                }}
                            >
                                Invite & Earn
                            </Text>
                        </Flex>
                    </LButton>
                    <Flex
                        justify={"space-between"}
                        sx={{
                            marginTop: "8px",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: "12px",
                                fontWeight: "700",
                            }}
                        >
                            Reward Earned
                        </Text>
                        <Flex align={"center"}>
                            <Image
                                src={EthIcon}
                                sx={{
                                    width: "6px",
                                    marginRight: "4px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: "12px",
                                }}
                            >
                                {referralReward}
                            </Text>
                        </Flex>
                    </Flex>
                    {user?.wallet?.walletClientType === "privy" && (
                        <Flex
                            sx={{
                                marginTop: "20px",
                                cursor: "pointer",
                            }}
                            onClick={async () => {
                                exportWallet();
                            }}
                            align={"center"}
                            justify={"center"}
                        >
                            <Image
                                src={ExportIcon}
                                sx={{
                                    marginRight: "4px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: "12px",
                                    color: "#fff",
                                }}
                            >
                                Export Embedded Wallet{" "}
                            </Text>
                        </Flex>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

const MyPaper = ({
    balance,
    handleMintPlane,
}: {
    balance: string;
    handleMintPlane: () => void;
}) => {
    return (
        <Box
            sx={{
                marginTop: "30px",
            }}
        >
            <Box
                sx={{
                    borderBottom: "1px dashed  #fff",
                    paddingBottom: "8px",
                }}
            >
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: "18px",
                    }}
                >
                    Paper
                </Text>
            </Box>
            <Flex flexDir={"column"} align={"center"}>
                <Box
                    sx={{
                        width: "110px",
                        height: "110px",
                        marginTop: "24px",
                        background: `url(${PaperIcon}) no-repeat`,
                        backgroundSize: "100% 100%",
                        position: "relative",
                    }}
                >
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            width: "100px",
                            height: "50px",
                            position: "absolute",
                            background: "rgba(0, 0, 0, 0.50)",
                            bottom: "10px",
                            left: "50%",
                            transform: "translate(-50%,0)",
                            borderRadius: "0 0 50px 50px",
                            fontSize: "24px",
                            verticalAlign: "bottom",
                        }}
                    >
                        <Box
                            sx={{
                                display: "inline-block",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "14px",
                                    verticalAlign: "bottom",
                                    display: "inline-block",
                                    lineHeight: "30px",
                                }}
                            >
                                X
                            </span>{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    display: "inline-block",
                                    lineHeight: "30px",
                                }}
                            >
                                {balance}
                            </span>
                        </Box>
                    </Flex>
                </Box>

                <LButton
                    sx={{
                        height: "40px",
                        width: "180px",
                        background: "#292929",
                        marginTop: "20px",
                    }}
                    onClick={handleMintPlane}
                    align={"center"}
                >
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: "#fff",
                            marginRight: "5px",
                        }}
                    >
                        Fold A Paper Plane
                    </Text>
                    <Image
                        src={MoreArrow}
                        sx={{
                            marginRight: "5px",
                        }}
                    ></Image>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Image
                            src={aviationImg(1)}
                            sx={{
                                width: "36px",
                            }}
                        ></Image>
                    </Box>
                </LButton>
            </Flex>
        </Box>
    );
};

const PlaneItem = ({ detail }: { detail: any }) => {
    return (
        <Flex flexDir={"column"} align={"center"}>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    background: `url(${PlaneBg}) no-repeat`,
                    backgroundSize: "100% 100%",
                    position: "relative",
                }}
            >
                <Image
                    src={detail.img}
                    sx={{
                        width: "180%",
                        maxWidth: "180%",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
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
                    width: "70px",
                    height: "7px",
                    padding: "1px",
                    border: "1px solid #FFF",
                    borderRadius: "5px",
                }}
            >
                <Box
                    sx={{
                        width:
                            ((detail.points - detail.prePoints) /
                                (detail.nextPoints - detail.prePoints)) *
                                100 +
                            "%",
                        height: "100%",
                        background: "#fff",
                    }}
                ></Box>
            </Box>
            <Text
                sx={{
                    fontSize: "12px",
                }}
            >
                Next Lvl:
            </Text>
            <Text
                sx={{
                    fontSize: "12px",
                }}
            >
                {detail.points}/
                <span
                    style={{
                        color: "#CCC",
                    }}
                >
                    {detail.nextPoints}pt
                </span>
            </Text>
        </Flex>
    );
};

const MyPlane = ({
    planeList,
    planeInit,
}: {
    planeList: any[];
    planeInit: boolean;
}) => {
    return (
        <Box
            sx={{
                marginTop: "30px",
            }}
        >
            <Box
                sx={{
                    borderBottom: "1px dashed  #fff",
                    paddingBottom: "8px",
                }}
            >
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: "18px",
                    }}
                >
                    Plane
                </Text>
            </Box>

            <Box
                sx={{
                    paddingTop: "48px",
                }}
            >
                {planeInit ? (
                    <Box>
                        {planeList.length > 0 ? (
                            <SimpleGrid
                                columns={3}
                                spacingY={"20px"}
                                spacingX={"10px"}
                            >
                                {planeList.map((item, index) => {
                                    return (
                                        <PlaneItem
                                            detail={item}
                                            key={index}
                                        ></PlaneItem>
                                    );
                                })}
                            </SimpleGrid>
                        ) : (
                            <Flex flexDir={"column"} align={"center"}>
                                <Image
                                    src={NoPlane}
                                    sx={{
                                        width: "140px",
                                    }}
                                ></Image>
                            </Flex>
                        )}
                    </Box>
                ) : (
                    <SimpleGrid columns={3} spacingY={"10px"}>
                        {new Array(3).fill("").map((item, index) => {
                            return (
                                <Flex
                                    sx={{
                                        position: "relative",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                    key={index}
                                >
                                    <Image
                                        src={BiddingGif}
                                        sx={{ width: "50px", height: "50px" }}
                                    ></Image>
                                </Flex>
                            );
                        })}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
};

const UserInfoDrawer = ({
    onClose,
    isOpen,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const toast = useSkyToast();
    const {
        isOpen: mintOpen,
        onOpen: onMintOpen,
        onClose: onMintClose,
    } = useDisclosure();
    const { openLoading, closeLoading } = useSubmitRequest();
    const [planeList, setPlaneList] = useState([] as any[]);
    const [planeInit, setPlaneInit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ethBalance, setEthBalance] = useState("0");
    const [paperBalance, setPaperBalance] = useState("0");
    const [referralReward, setReferralReward] = useState("0");
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const { logout } = usePrivy();
    const leagueTournamentContract = useLeagueTournamentContract();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const { tgInfo, address } = useUserInfo();

    const handlePaperToPlane = async (leader: string) => {
        try {
            openLoading();
            const hash = await leagueTournamentContract.write.mintWithPaper([
                leader,
            ]);

            // @ts-ignore
            await publicClient.waitForTransactionReceipt({
                hash,
            });
            closeLoading();
            handleGetUserPaper();
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };

    const handleGetUserPaper = async () => {
        if (!multiMercuryJarTournamentContract || !multiProvider || !address) {
            setPlaneList([]);
            return;
        }
        if (loading) {
            return;
        }

        try {
            setLoading(true);
            const [ethBalance, planeBalance, paperBalance, referralReward] =
                await multiProvider.all([
                    multiProvider.getEthBalance(address),
                    multiMercuryJarTournamentContract.balanceOf(address),
                    multiMercuryJarTournamentContract.paperBalance(address),
                    multiMercuryJarTournamentContract.referralReward(address),
                ]);
            console.log(referralReward, "ethBalance");
            const p = [];
            for (let i = 0; i < Number(planeBalance.toString()); i++) {
                p.push(
                    multiMercuryJarTournamentContract.tokenOfOwnerByIndex(
                        address,
                        i,
                    ),
                );
            }

            const tokenIds = await multiProvider.all(p);
            const res = await getTokensGame({
                tokens: tokenIds.map((item) => {
                    return item.toString();
                }),
            });

            const tokensGame = res.data.tokensGame;

            const p2: any = [];
            tokenIds.forEach((item) => {
                p2.push(multiMercuryJarTournamentContract.aviationPoints(item));
                p2.push(
                    multiMercuryJarTournamentContract.isAviationLocked(item),
                );
            });

            const levels = await multiProvider.all(p2);

            const planeList = tokenIds.map((item, index) => {
                const points = Number(levels[index * 2].toString());
                const levelItem = levelRanges.find((item) => {
                    return points < item.maxPoints && points >= item.minPoints;
                });
                const state = levels[index * 2 + 1];
                const level = levelItem.level;
                const nextPoints = levelItem.maxPoints;
                const prePoints = levelItem.minPoints;
                const inGame = tokensGame.find((item1: any) => {
                    return (
                        item1.tokenId1 === Number(item.toString()) ||
                        item1.tokenId2 === Number(item.toString())
                    );
                });
                return {
                    tokenId: item.toString(),
                    points,
                    level: level,
                    img: aviationImg(level),
                    nextPoints,
                    prePoints,
                    state,
                    gameId: inGame ? inGame.id : 0,
                };
            });

            setPlaneInit(true);
            setPlaneList(planeList);
            setEthBalance(ethBalance.toString());
            setReferralReward(referralReward.toString());
            setPaperBalance(paperBalance.toString());
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setPlaneInit(true);
        }
    };

    useEffect(() => {
        handleGetUserPaper();
    }, [multiMercuryJarTournamentContract, multiProvider, address]);

    return (
        <Drawer
            placement={isPc ? "right" : "bottom"}
            onClose={onClose}
            isOpen={isOpen}
        >
            <DrawerOverlay />
            <DrawerContent
                sx={{
                    border: "1px solid #F2D861",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(25px)",
                    position: "relative",
                    maxWidth: "375px",
                    height: "100%",
                }}
            >
                <DrawerBody
                    sx={{
                        padding: "30px",
                        width: "100% !important",
                        height: "100%",
                    }}
                >
                    {isPc ? (
                        <Image
                            src={RightArrowIcon}
                            sx={{
                                width: "24px",
                                top: "40px",
                                left: "-36px",
                                position: "absolute",
                            }}
                            onClick={onClose}
                        ></Image>
                    ) : (
                        <Flex justify={"center"}>
                            <Image
                                onClick={onClose}
                                src={DownArrowIcon}
                            ></Image>
                        </Flex>
                    )}

                    <Box>
                        <Flex
                            justify={"flex-end"}
                            align={"center"}
                            sx={{
                                height: "30px",
                            }}
                        >
                            <Image
                                onClick={async () => {
                                    await logout();
                                    localStorage.removeItem("tournamentToken");
                                    onClose();
                                }}
                                src={QuitIcon}
                                sx={{
                                    width: "24px",
                                    cursor: "pointer",
                                }}
                            ></Image>
                        </Flex>
                        <Avatar
                            sx={{
                                width: "80px",
                                height: "80px",
                                margin: "0 auto",
                            }}
                        >
                            <Image
                                src={tgInfo.photoUrl}
                                sx={{
                                    width: "100%",
                                }}
                            ></Image>
                        </Avatar>
                        <UserInfo
                            referralReward={referralReward}
                            ethBalance={ethBalance}
                        ></UserInfo>
                        <MyPaper
                            balance={paperBalance}
                            handleMintPlane={onMintOpen}
                        ></MyPaper>
                        <MyPlane
                            planeList={planeList}
                            planeInit={planeInit}
                        ></MyPlane>
                    </Box>
                    <ChooseTeamModal
                        mintType="paperToPlane"
                        handleMint={(leader: string) =>
                            handlePaperToPlane(leader)
                        }
                        isOpen={mintOpen}
                        onClose={onMintClose}
                    ></ChooseTeamModal>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default UserInfoDrawer;
