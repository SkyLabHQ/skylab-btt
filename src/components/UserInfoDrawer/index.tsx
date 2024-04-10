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
    useMediaQuery,
    SkeletonCircle,
    Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CopyIcon from "@/assets/copy-icon.svg";
import QuitIcon from "./assets/quit.png";
import RightArrowIcon from "./assets/right-arrow.svg";
import DownArrowIcon from "./assets/down-arrow.png";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { shortenAddress } from "@/utils";
import PaperIcon from "./assets/paper.png";
import GrayArrow from "./assets/gray-arrow.svg";
import Blackrrow from "./assets/black-arrow.svg";
import { aviationImg } from "@/utils/aviationImg";
import NoPlane from "./assets/no-plane.png";
import DiscordIcon from "./assets/discord.png";
import TwIcon from "./assets/twitter.png";
import EditNickname from "./EditNickname";
import SetPilot from "./SetPilot";
import { PilotInfo } from "@/hooks/usePilotInfo";
import MyPilot from "../MyPilot";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import { levelRanges } from "@/utils/level";
import PlaneBg from "./assets/plane-bg.png";
import SetPilotIcon from "./assets/setPilot.svg";
import SetNameIcon from "./assets/setName.png";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import BiddingGif from "@/assets/bidding.gif";

const UserInfo = ({
    userName,
    userNameInit,
    handleChangeMode,
}: {
    userName: string;
    userNameInit: boolean;
    handleChangeMode: (mode: number) => void;
}) => {
    const { user } = usePrivy();
    const { address } = usePrivyAccounts();
    const toast = useSkyToast();
    const { onCopy } = useClipboard(address);
    const { activePilot } = useUserInfoRequest();

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <MyPilot imgUrl={activePilot.img} width={"80px"}></MyPilot>
                <Image
                    src={SetPilotIcon}
                    sx={{
                        width: "24px",
                        marginRight: "12px",
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translate(-50%,0)",
                    }}
                    onClick={() => {
                        handleChangeMode(2);
                    }}
                ></Image>
            </Box>
            {userNameInit ? (
                <Flex
                    sx={{
                        marginTop: "8px",
                    }}
                    align={"center"}
                >
                    {user?.discord && (
                        <Image
                            src={DiscordIcon}
                            sx={{
                                width: "16px",
                                marginRight: "4px",
                            }}
                        ></Image>
                    )}
                    {user?.twitter && (
                        <Image
                            src={TwIcon}
                            sx={{
                                width: "16px",
                                marginRight: "4px",
                            }}
                        ></Image>
                    )}

                    <Flex
                        sx={{
                            fontSize: "14px",
                            color: "#F2D861",
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
                            {userName
                                ? userName
                                : `${shortenAddress(address, 4, 4)}`}
                        </Text>
                        <Image
                            src={CopyIcon}
                            sx={{
                                width: "14px",
                            }}
                        ></Image>
                    </Flex>
                </Flex>
            ) : (
                <Box
                    sx={{
                        marginTop: "8px",
                    }}
                >
                    <Flex align={"center"}>
                        <SkeletonCircle
                            size="5"
                            startColor="#FDDC2D"
                            endColor="#fff"
                            sx={{
                                marginRight: "10px",
                            }}
                        />
                        <Skeleton
                            startColor="#FDDC2D"
                            endColor="#fff"
                            height="10px"
                            width={"100px"}
                        />
                    </Flex>
                    <Skeleton
                        startColor="#FDDC2D"
                        endColor="#fff"
                        height="10px"
                        width={"100%"}
                        sx={{
                            marginTop: "8px",
                        }}
                    />
                </Box>
            )}
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

                <Flex
                    sx={{
                        borderRadius: "12px",
                        background: Number(balance) > 0 ? "#F2D861" : "#777",
                        height: "40px",
                        width: "180px",
                        paddingLeft: "8px",
                        marginTop: "15px",
                    }}
                    onClick={handleMintPlane}
                    align={"center"}
                >
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: Number(balance) > 0 ? "#1b1b1b" : "#999",
                            marginRight: "5px",
                        }}
                    >
                        Fold A Paper Plane
                    </Text>
                    <Image
                        src={Number(balance) > 0 ? Blackrrow : GrayArrow}
                    ></Image>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Image
                            src={aviationImg(1)}
                            sx={{
                                position: "absolute",
                                left: "0",
                                top: 0,
                                width: "70px",
                                maxWidth: "70px",
                                transform: "translate(0,-50%)",
                            }}
                        ></Image>
                    </Box>
                </Flex>
                {/* <Flex
                    sx={{
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.82)",
                        height: "40px",
                        width: "180px",
                        paddingLeft: "8px",
                        marginTop: "15px",
                        border: "1px solid #F2D861",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: "#777",
                        }}
                    >
                        You can only fold paper plane after Tournament Begins!
                    </Text>
                </Flex> */}
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
                                (detail.nextPoints - detail.points)) *
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const publicClient = usePublicClient();
    const chainId = useChainId();
    const { address } = usePrivyAccounts();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const { logout } = usePrivy();
    const [paperBalance, setPaperBalance] = useState("0");
    const [userName, setUserName] = useState("");
    const [userNameInit, setUserNameInit] = useState(false);
    const [planeList, setPlaneList] = useState([] as any[]);
    const [planeInit, setPlaneInit] = useState(false);
    const [currentMode, setCurrentMode] = useState(0); // 0展示用户信息 1设置昵称 2设置pilot
    const { isBlock, blockOpen, handleBlock } = useUserInfoRequest();

    const handleChangeMode = (mode: number) => {
        setCurrentMode(mode);
    };

    const handleGetUserPaper = async () => {
        const [planeBalance, paperBalance, userName] = await multiProvider.all([
            multiMercuryJarTournamentContract.balanceOf(address),
            multiMercuryJarTournamentContract.paperBalance(address),
            multiMercuryJarTournamentContract.userName(address),
        ]);
        setUserName(userName);
        setUserNameInit(true);
        setPaperBalance(paperBalance.toString());
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

        const levelP = tokenIds.map((item) => {
            return multiMercuryJarTournamentContract.aviationPoints(item);
        });

        const levels = await multiProvider.all(levelP);

        const planeList = tokenIds.map((item, index) => {
            const points = Number(levels[index].toString());
            const levelItem = levelRanges.find((item) => {
                return points < item.maxPoints && points >= item.minPoints;
            });
            const level = levelItem.level;
            const nextPoints = levelItem.maxPoints;
            const prePoints = levelItem.minPoints;
            return {
                tokenId: item.toString(),
                points,
                level: level,
                img: aviationImg(level),
                nextPoints,
                prePoints,
            };
        });

        setPlaneInit(true);
        setPlaneList(planeList);
    };

    const handleSetUserName = async (name: string) => {
        try {
            const hash =
                await mercuryJarTournamentContract.write.registerUserName([
                    name,
                ]);

            // @ts-ignore
            await publicClient.waitForTransactionReceipt({ hash });
            setUserName(name);
        } catch (e) {
            toast(handleError(e));
        }
    };

    const handleMintPlane = async () => {
        if (isBlock) {
            if (blockOpen) {
                return;
            }
            handleBlock(true);
            return;
        }

        if (Number(paperBalance) === 0) {
            return;
        }
        try {
            const hash = await mercuryJarTournamentContract.write.mintWithPaper(
                [1],
                {},
            );
            console.log(hash, "hash");
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
            toast(handleError(e));
        }
    };

    useEffect(() => {
        if (
            !isOpen ||
            !multiMercuryJarTournamentContract ||
            !multiProvider ||
            !address
        ) {
            return;
        }
        handleGetUserPaper();
    }, [isOpen, multiMercuryJarTournamentContract, multiProvider]);

    return (
        <Drawer
            placement={isPc ? "right" : "bottom"}
            onClose={onClose}
            isOpen={isOpen}
        >
            <DrawerOverlay />
            <DrawerContent
                sx={{
                    borderRadius: "20px",
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

                    {currentMode === 0 && (
                        <Box>
                            <Flex
                                justify={"flex-end"}
                                align={"center"}
                                sx={{
                                    height: "30px",
                                }}
                            >
                                <Image
                                    src={SetNameIcon}
                                    sx={{
                                        width: "24px",
                                        marginRight: "12px",
                                    }}
                                    onClick={() => {
                                        handleChangeMode(1);
                                    }}
                                ></Image>
                                <Image
                                    onClick={async () => {
                                        await logout();
                                        onClose();
                                    }}
                                    src={QuitIcon}
                                    sx={{
                                        width: "24px",
                                    }}
                                ></Image>
                            </Flex>
                            <UserInfo
                                userName={userName}
                                userNameInit={userNameInit}
                                handleChangeMode={handleChangeMode}
                            ></UserInfo>
                            <MyPaper
                                balance={paperBalance}
                                handleMintPlane={handleMintPlane}
                            ></MyPaper>
                            <MyPlane
                                planeList={planeList}
                                planeInit={planeInit}
                            ></MyPlane>
                        </Box>
                    )}
                    {currentMode === 1 && (
                        <EditNickname
                            onSetUserName={(userName: string) => {
                                handleSetUserName(userName);
                            }}
                            onChangeMode={(mode: number) => {
                                handleChangeMode(mode);
                            }}
                        ></EditNickname>
                    )}
                    {currentMode === 2 && (
                        <SetPilot
                            onChangeMode={(mode: number) => {
                                handleChangeMode(mode);
                            }}
                        ></SetPilot>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default UserInfoDrawer;
