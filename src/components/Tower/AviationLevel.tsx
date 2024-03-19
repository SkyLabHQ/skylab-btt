import {
    Box,
    Flex,
    Image,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SYellowIcon from "./assets/s-yellow.png";
import SGreenIcon from "./assets/s-green.png";
import RYellowIcon from "./assets/x-yellow-r.png";
import LYellowIcon from "./assets/x-yellow-l.png";
import AmountBg from "./assets/amount-bg.png";
import AmountBg1 from "./assets/amount-bg1.png";

import LevelBg from "./assets/level-bg.png";
import { aviationImg } from "@/utils/aviationImg";
import {
    useMultiMercuryJarTournamentContract,
    useMultiMercuryPilotsContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import NewComerBg from "./assets/newcomer-bg.png";
import { ZERO_DATA } from "@/skyConstants";
import Timer from "./Timer";
import { shortenAddress } from "@/utils";
import LevelLeaderboardModal from "./LevelLeaderboardModal";
import PaperIcon from "./assets/paper.png";
import { ActivePilotRes, handlePilotsInfo1 } from "@/skyConstants/pilots";
import DefaultAvatar from "./assets/default-avatar.png";
import LockIcon from "./assets/lock.png";

const list = [
    {
        level: 16,
        position: {
            top: "0",
            left: "150px",
        },
        comerPosition: "left",
        arrowImg: LYellowIcon,
        imgPosition: {
            width: "320px",
            top: "75px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 15,
        position: {
            top: "180px",
            right: "150px",
        },
        comerPosition: "right",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "360px",
            right: "220px",
            width: "25px",
        },
        avatarDirection: "left",
    },
    {
        level: 14,
        position: {
            top: "630px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: RYellowIcon,
        imgPosition: {
            top: "700px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 13,
        position: {
            top: "750px",
            left: "150px",
        },
        comerPosition: "left",

        arrowImg: SYellowIcon,
        imgPosition: {
            top: "930px",
            width: "25px",
            left: "220px",
        },
        avatarDirection: "right",
    },

    {
        level: 12,
        position: {
            top: "1200px",
            left: "150px",
        },
        comerPosition: "right",

        arrowImg: LYellowIcon,
        imgPosition: {
            top: "1270px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 11,
        position: {
            top: "1320",
            right: "150px",
        },
        comerPosition: "left",

        arrowImg: SYellowIcon,
        imgPosition: {
            top: "1500",
            right: "220px",
            width: "25px",
        },
        avatarDirection: "left",
    },
    {
        level: 10,
        position: {
            top: "1770px",
            right: "150px",
        },
        comerPosition: "left",

        arrowImg: RYellowIcon,
        imgPosition: {
            top: "1840px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 9,
        position: {
            top: "1920px",
            left: "150px",
        },
        comerPosition: "right",

        arrowImg: SYellowIcon,
        imgPosition: {
            top: "2070px",
            left: "220px",
            width: "25px",
        },
        avatarDirection: "right",
    },
    {
        level: 8,
        position: {
            top: "2350px",
            left: "150px",
        },
        comerPosition: "right",

        arrowImg: LYellowIcon,
        imgPosition: {
            top: "2410px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 7,
        position: {
            top: "2490px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: SYellowIcon,
        imgPosition: {
            top: "2640px",
            width: "25px",
            right: "220px",
        },
        avatarDirection: "left",
    },
    {
        level: 6,
        position: {
            top: "2920px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: RYellowIcon,
        imgPosition: {
            top: "2980px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 5,
        position: {
            top: "3060px",
            left: "150px",
        },
        comerPosition: "left",

        arrowImg: SYellowIcon,
        imgPosition: {
            top: "3210px",
            width: "25px",
            left: "220px",
        },
        avatarDirection: "right",
    },
    {
        level: 4,
        position: {
            top: "3500px",
            left: "150px",
        },
        comerPosition: "left",

        arrowImg: LYellowIcon,
        imgPosition: {
            top: "3550px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 3,
        position: {
            top: "3630px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: SYellowIcon,
        imgPosition: {
            top: "3780px",
            width: "25px",
            right: "220px",
        },
        avatarDirection: "left",
    },
    {
        level: 2,
        position: {
            top: "4060px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: RYellowIcon,
        imgPosition: {
            top: "4130px",
            width: "320px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 1,
        position: {
            top: "4190px",
            left: "150px",
        },
        comerPosition: "left",

        arrowImg: SGreenIcon,
        imgPosition: {
            top: "4380px",
            width: "25px",
            left: "220px",
        },
        avatarDirection: "right",
    },
];

const mlist = [
    {
        level: 16,
        position: {
            top: "0",
            left: "20px",
        },
        comerPosition: "left",
        arrowImg: LYellowIcon,
        imgPosition: {
            width: "86px",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 15,
        position: {
            top: "45px",
            right: "20px",
        },
        comerPosition: "right",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "150px",
            right: "58px",
            width: "8px",
        },
        avatarDirection: "left",
    },
    {
        level: 14,
        position: {
            top: "240px",
            right: "20px",
        },
        comerPosition: "right",
        arrowImg: RYellowIcon,
        imgPosition: {
            top: "280px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 13,
        position: {
            top: "280px",
            left: "20px",
        },
        comerPosition: "left",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "390px",
            width: "8px",
            left: "58px",
        },
        avatarDirection: "right",
    },
    {
        level: 12,
        position: {
            top: "480px",
            left: "20px",
        },
        comerPosition: "right",
        arrowImg: LYellowIcon,
        imgPosition: {
            top: "520px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 11,
        position: {
            top: "520px",
            right: "20px",
        },
        comerPosition: "left",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "630px",
            right: "58px",
            width: "8px",
        },
        avatarDirection: "left",
    },
    {
        level: 10,
        position: {
            top: "720px",
            right: "20px",
        },
        comerPosition: "left",
        arrowImg: RYellowIcon,
        imgPosition: {
            top: "760px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 9,
        position: {
            top: "760px",
            left: "20px",
        },
        comerPosition: "right",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "870px",
            left: "58px",
            width: "8px",
        },
        avatarDirection: "right",
    },
    {
        level: 8,
        position: {
            top: "960px",
            left: "20px",
        },
        comerPosition: "right",
        arrowImg: LYellowIcon,
        imgPosition: {
            top: "1000px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 7,
        position: {
            top: "1000px",
            right: "20px",
        },
        comerPosition: "right",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "1110px",
            right: "58px",
            width: "8px",
        },
        avatarDirection: "left",
    },
    {
        level: 6,
        position: {
            top: "1200px",
            right: "20px",
        },
        comerPosition: "right",
        arrowImg: RYellowIcon,
        imgPosition: {
            top: "1240px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 5,
        position: {
            top: "1240px",
            left: "20px",
        },
        comerPosition: "left",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "1350px",
            left: "58px",
            width: "8px",
        },
        avatarDirection: "right",
    },
    {
        level: 4,
        position: {
            top: "1440px",
            left: "20px",
        },
        comerPosition: "left",
        arrowImg: LYellowIcon,

        imgPosition: {
            top: "1480px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 3,
        position: {
            top: "1480px",
            right: "20px",
        },
        comerPosition: "right",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "1590px",
            right: "58px",
            width: "8px",
        },
        avatarDirection: "left",
    },
    {
        level: 2,
        position: {
            top: "1680px",
            right: "20px",
        },
        comerPosition: "right",
        arrowImg: RYellowIcon,
        imgPosition: {
            top: "1720px",
            width: "86px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "left",
    },
    {
        level: 1,
        position: {
            top: "1720px",
            left: "20px",
        },
        comerPosition: "left",
        arrowImg: SGreenIcon,
        imgPosition: {
            top: "1830px",
            left: "58px",
            width: "8px",
        },
        avatarDirection: "right",
    },
];

const levelInfoInit: any = Array.from({ length: 16 }, (_, index) => ({
    level: index + 1,
    levelTokenIds: [],
    tokenId: "0",
    claimTime: 0,
    owner: "",
    userName: "",
    pilotImg: "",
}));

const AviationLevel = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const {
        isOpen: isLeaderboardModalOpen,
        onOpen: openLeaderboardModal,
        onClose: closeLeaderboardModal,
    } = useDisclosure();

    const [currentIndex, setCurrentIndex] = useState(1);
    const chainId = useChainId();

    const multiMercuryPilotsContract = useMultiMercuryPilotsContract(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const multiProvider = useMultiProvider(chainId);
    const [levelInfo, setLevelInfo] = useState(levelInfoInit);
    const [totalPaper, setTotalPaper] = useState("0");

    const handleLevelInfo = async () => {
        const p = [];

        // const pp = [];

        // for (let i = 1; i <= 16; i++) {
        //     pp.push(multiMercuryJarTournamentContract.getNewCommerInfo(i));
        // }
        // console.time("aaa");

        // const resrrr = await multiProvider.all(pp);
        // console.log(resrrr, "resrrr");
        // console.timeEnd("aaa");

        console.time("a");
        for (let i = 1; i <= 16; i++) {
            p.push(multiMercuryJarTournamentContract.getTokenIdPerLevel(i));
            p.push(multiMercuryJarTournamentContract.levelToNewComerId(i));
            p.push(multiMercuryJarTournamentContract.levelToClaimTime(i));
        }
        p.push(multiMercuryJarTournamentContract.paperTotalAmount());
        const res = await multiProvider.all(p);
        console.log(res, "dnwkldnklwndekl");
        console.timeEnd("a");
        const paperTotalAmount = res.pop();
        setTotalPaper(paperTotalAmount.toString());
        const levelTokenInfo = [];
        for (let i = 0; i < 16; i++) {
            levelTokenInfo.push({
                levelTokenIds: res[i * 3], // 该等级的名称列表
                tokenId: res[i * 3 + 1].toString(), //new comer 的 tokenId
                claimTime: res[i * 3 + 2].toNumber(), //new comer 的 截止时间
            });
        }

        // 获取tokenId的owner
        const p1 = [];
        for (let i = 0; i < levelTokenInfo.length; i++) {
            if (levelTokenInfo[i].tokenId === "0") continue;
            const tokenId = levelTokenInfo[i].tokenId;
            p1.push(multiMercuryJarTournamentContract.ownerOf(tokenId));
            p1.push(multiMercuryJarTournamentContract.aviationPoints(tokenId));
        }

        console.time("b");
        const p1R = await multiProvider.all(p1);
        console.timeEnd("b");
        const p2 = [];

        for (let i = 0; i < p1.length / 2; i++) {
            p2.push(
                multiMercuryJarTournamentContract.userName(p1R[i * 2]),
                multiMercuryPilotsContract.getActivePilot(p1R[i * 2]),
            );
        }

        console.time("c");
        const p2R = await multiProvider.all(p2);
        console.timeEnd("c");
        const allPilot: ActivePilotRes[] = [];
        for (let i = 0; i < p1.length / 2; i++) {
            const item = p2R[i * 2 + 1];
            allPilot.push({
                ...item,
                pilotId: item.pilotId.toNumber(),
            });
        }

        console.time("d");
        const pilotList = await handlePilotsInfo1({
            chainId: chainId,
            allPilot,
        });
        console.timeEnd("d");

        let jIndex = -1;
        const list = levelTokenInfo.map((item, index) => {
            if (item.tokenId === "0") {
                return {
                    ...item,
                    level: index + 1,
                    owner: "",
                    userName: "",
                    pilotImg: "",
                };
            }
            jIndex++;
            return {
                ...item,
                level: index + 1,
                owner: item.tokenId === "0" ? ZERO_DATA : p1R[jIndex * 2], //new comer 的 owner
                userName: item.tokenId === "0" ? p2R[jIndex] : "", //new comer 的 名称
                pilotImg:
                    item.tokenId === "0" ? "" : pilotList[jIndex].pilotImg,
                points: p1R[jIndex * 2 + 1].toString(),
            };
        });
        setLevelInfo(list.reverse());
    };

    const handleLeaderboard = (index: number) => {
        setCurrentIndex(index);
        openLeaderboardModal();
    };

    useEffect(() => {
        if (!multiProvider || !multiMercuryJarTournamentContract) return;
        handleLevelInfo();
        // const timer = setInterval(() => {
        //     handleLevelInfo();
        // }, 10000);
        // return () => {
        //     clearInterval(timer);
        // };
    }, [multiProvider, multiMercuryJarTournamentContract]);

    return (
        <Box
            sx={{
                height: isPc ? "100%" : "80%",
                width: "100%",
                overflow: "auto",
                position: "absolute",
                top: "20px",
                left: "0%",
                // transform: "translateX(-50%)",
                "::-webkit-scrollbar": {
                    display: "none",
                },
                paddingBottom: "200px",
            }}
        >
            <Box
                sx={{
                    width: isPc ? "960px" : "300px",
                    margin: "0 auto",
                    position: "relative",
                }}
            >
                {(isPc ? list : mlist).map((item, index) => {
                    return (
                        <Box key={index}>
                            <Box
                                sx={{
                                    cursor:
                                        levelInfo[index].levelTokenIds.length >
                                            0 && "pointer",
                                    position: "absolute",
                                    zIndex: 999,
                                    ...item.position,
                                }}
                                onClick={() => {
                                    levelInfo[index].levelTokenIds.length > 0 &&
                                        handleLeaderboard(index);
                                }}
                            >
                                <Flex
                                    sx={{
                                        width: isPc ? "160px" : "84px",
                                        height: isPc ? "160px" : "84px",
                                        backgroundImage: `url(${LevelBg})`,
                                        backgroundSize: "100% 100%",
                                    }}
                                    flexDir={"column"}
                                    align={"center"}
                                    position={"relative"}
                                >
                                    {/* new commer 展示 */}
                                    {isPc &&
                                        levelInfo?.[index]?.tokenId !== "0" && (
                                            <Flex
                                                align={"center"}
                                                justify={"center"}
                                                flexDir={"column"}
                                                sx={{
                                                    position: "absolute",
                                                    backgroundSize: "100% 100%",
                                                    top: "50%",
                                                    left:
                                                        item.comerPosition ===
                                                        "right"
                                                            ? "168px"
                                                            : "-114px",
                                                    transform: `translate(0%,-50%)`,
                                                }}
                                            >
                                                <Text
                                                    sx={{
                                                        position: "absolute",
                                                        top: "-24px",
                                                        width: "100%",
                                                        textAlign: "center",
                                                        fontFamily: "Quantico",
                                                        fontSize: "14px",
                                                        fontStyle: "normal",
                                                    }}
                                                >
                                                    New Comer
                                                </Text>
                                                <Flex
                                                    sx={{
                                                        background: `url(${NewComerBg})`,
                                                        width: "107px",
                                                        height: "98px",
                                                        transform:
                                                            item.avatarDirection ===
                                                            "left"
                                                                ? "scaleX(-1)"
                                                                : "",
                                                    }}
                                                    justify={"center"}
                                                    align={"center"}
                                                >
                                                    <Image
                                                        src={
                                                            levelInfo[index]
                                                                .pilotImg
                                                                ? levelInfo[
                                                                      index
                                                                  ].pilotImg
                                                                : DefaultAvatar
                                                        }
                                                        sx={{
                                                            width: "72px",
                                                            height: "72px",
                                                            borderRadius: "50%",
                                                        }}
                                                    ></Image>
                                                </Flex>

                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: "-54px",
                                                        width: "100%",
                                                        textAlign: "center",
                                                        fontFamily: "Quantico",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <Text
                                                        sx={{
                                                            width: "120px",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {levelInfo[index]
                                                            .userName
                                                            ? levelInfo[index]
                                                                  .userName
                                                            : `${shortenAddress(
                                                                  levelInfo[
                                                                      index
                                                                  ].owner,
                                                              )}`}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        )}

                                    <Image
                                        src={aviationImg(item.level)}
                                        sx={{
                                            width: "80%",
                                        }}
                                    ></Image>
                                    {levelInfo[index].levelTokenIds.length ===
                                        0 && (
                                        <Flex
                                            sx={{
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                width: "100%",
                                                height: "100%",
                                                background:
                                                    "rgba(0, 0, 0, 0.80)",
                                                borderRadius: "50%",
                                                zIndex: 9,
                                            }}
                                            align={"center"}
                                            justify={"center"}
                                        >
                                            <Image
                                                src={LockIcon}
                                                sx={{
                                                    width: "34px",
                                                }}
                                            ></Image>
                                        </Flex>
                                    )}

                                    <Text
                                        sx={{
                                            position: "absolute",
                                            bottom: isPc ? "30px" : "15px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            fontSize: isPc ? "30px" : "14px",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        Lvl. {item.level}
                                    </Text>
                                    <Flex
                                        sx={{
                                            background: `url(${AmountBg})`,
                                            backgroundSize: "100% 100%",
                                            width: isPc ? "48px" : "32px",
                                            height: isPc ? "48px" : "32px",
                                            position: "absolute",
                                            bottom: "0",
                                            left: "50%",
                                            transform: "translate(-50%,40%)",
                                            zIndex: "10",
                                        }}
                                        justify={"center"}
                                        align={"center"}
                                    >
                                        <Box
                                            sx={{
                                                verticalAlign: "bottom",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "12px",
                                                }}
                                            >
                                                x
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {
                                                    levelInfo?.[index]
                                                        ?.levelTokenIds.length
                                                }
                                            </span>
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Timer
                                    time={levelInfo?.[index]?.claimTime}
                                ></Timer>
                            </Box>
                            <Image
                                src={item.arrowImg}
                                sx={{
                                    position: "absolute",
                                    ...item.imgPosition,
                                }}
                            ></Image>
                        </Box>
                    );
                })}
                <Box>
                    <Box
                        sx={{
                            position: "absolute",
                            zIndex: 999,
                            top: isPc ? "4680px" : "1930px",
                            left: isPc ? "150px" : "20px",
                        }}
                    >
                        <Flex
                            sx={{
                                width: isPc ? "160px" : "84px",
                                height: isPc ? "160px" : "84px",
                                backgroundImage: `url(${LevelBg})`,
                                backgroundSize: "100% 100%",
                            }}
                            flexDir={"column"}
                            align={"center"}
                            position={"relative"}
                        >
                            <Image
                                src={PaperIcon}
                                sx={{
                                    width: "80%",
                                }}
                            ></Image>

                            <Flex
                                sx={{
                                    background: `url(${AmountBg1})`,
                                    backgroundSize: "100% 100%",
                                    width: isPc ? "80px" : "60px",
                                    height: isPc ? "44px" : "32px",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "50%",
                                    transform: "translate(-50%,40%)",
                                }}
                                justify={"center"}
                                align={"center"}
                                flexDir={"column"}
                            >
                                <Text
                                    sx={{
                                        fontSize: isPc ? "14px" : "12px",
                                    }}
                                >
                                    Total
                                </Text>
                                <Box
                                    sx={{
                                        verticalAlign: "bottom",
                                        lineHeight: isPc ? "20px" : "16px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: isPc ? "12px" : "10px",
                                        }}
                                    >
                                        x
                                    </span>
                                    <span
                                        style={{
                                            fontSize: isPc ? "16px" : "12px",
                                        }}
                                    >
                                        {totalPaper}
                                    </span>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 999,
                        top: isPc ? "5000px" : "2000px",
                        left: "50%",
                        width: "1px",
                        height: "1px",
                    }}
                ></Box>
            </Box>
            <LevelLeaderboardModal
                isOpen={isLeaderboardModalOpen}
                onClose={closeLeaderboardModal}
                levelInfoDetail={levelInfo[currentIndex]}
            ></LevelLeaderboardModal>
        </Box>
    );
};
export default AviationLevel;
