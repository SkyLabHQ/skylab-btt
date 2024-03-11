import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SYellowIcon from "./assets/s-yellow.png";
import SGreenIcon from "./assets/s-green.png";
import RYellowIcon from "./assets/x-yellow-r.png";
import LYellowIcon from "./assets/x-yellow-l.png";
import AmountBg from "./assets/amount-bg.png";
import LevelBg from "./assets/level-bg.png";
import { aviationImg } from "@/utils/aviationImg";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import NewComerBg from "./assets/newcomer-bg.png";
import { ZERO_DATA } from "@/skyConstants";
import Timer from "./Timer";
import { shortenAddress } from "@/utils";
import LevelLeaderboardModal from "./LevelLeaderboardModal";

const list = [
    {
        level: 16,
        position: {
            top: "0%",
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
    },
];

const levelInfoInit = new Array(16).fill({
    name: [],
    tokenId: "0",
    claimTime: "0",
    owner: "",
    userName: "",
});

const AviationLevel = () => {
    const {
        isOpen: isLeaderboardModalOpen,
        onOpen: openLeaderboardModal,
        onClose: closeLeaderboardModal,
    } = useDisclosure();

    const [currentLevelLeaderboard, setCurrentLevelLeaderboard] = useState([]);
    const chainId = useChainId();
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const multiProvider = useMultiProvider(chainId);
    const [levelInfo, setLevelInfo] = useState(levelInfoInit);

    const handleLevelInfo = async () => {
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiMercuryJarTournamentContract.getUserNamePerLevel(i));
            p.push(multiMercuryJarTournamentContract.levelToNewComerId(i));
            p.push(multiMercuryJarTournamentContract.levelToClaimTime(i));
        }
        const res = await multiProvider.all(p);
        const levelTokenInfo = [];
        for (let i = 0; i < 16; i++) {
            levelTokenInfo.push({
                name: res[i * 3], // 该等级的名称列表
                tokenId: res[i * 3 + 1].toString(), //new comer 的 tokenId
                claimTime: res[i * 3 + 2].toString(), //new comer 的 截止时间
            });
        }

        // 获取tokenId的owner
        const pOwenrs = [];
        for (let i = 0; i < levelTokenInfo.length; i++) {
            if (levelTokenInfo[i].tokenId === "0") continue;
            pOwenrs.push(
                multiMercuryJarTournamentContract.ownerOf(
                    levelTokenInfo[i].tokenId,
                ),
            );
        }

        const owners = await multiProvider.all(pOwenrs);
        const pUserNames = [];
        for (let i = 0; i < pOwenrs.length; i++) {
            pUserNames.push(
                multiMercuryJarTournamentContract.userName(owners[i]),
            );
        }
        const userNames = await multiProvider.all(pUserNames);

        const list = levelTokenInfo.map((item, index) => {
            return {
                ...item,
                owner: item.tokenId === "0" ? ZERO_DATA : owners[index], //new comer 的 owner
                userName: item.tokenId === "0" ? userNames[index] : "", //new comer 的 名称
            };
        });

        setLevelInfo(list.reverse());
    };

    const handleLeaderboard = (list: any[]) => {
        setCurrentLevelLeaderboard(list);
        openLeaderboardModal();
    };

    useEffect(() => {
        if (!multiProvider || !multiMercuryJarTournamentContract) return;

        const timer = setInterval(() => {
            handleLevelInfo();
        }, 10000);
        return () => {
            clearInterval(timer);
        };
    }, [multiProvider, multiMercuryJarTournamentContract]);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                overflow: "auto",
                position: "absolute",
                top: "20px",
                left: "0%",
                // transform: "translateX(-50%)",
                "::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <Box
                sx={{
                    width: "960px",
                    margin: "0 auto",
                    position: "relative",
                }}
            >
                {list.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    zIndex: 999,
                                    ...item.position,
                                }}
                                onClick={() => {
                                    handleLeaderboard(levelInfo[index].name);
                                }}
                            >
                                <Flex
                                    sx={{
                                        width: "160px",
                                        height: "160px",
                                        backgroundImage: `url(${LevelBg})`,
                                        backgroundSize: "100% 100%",
                                    }}
                                    flexDir={"column"}
                                    align={"center"}
                                    position={"relative"}
                                >
                                    {/* new commer 展示 */}
                                    {levelInfo?.[index]?.tokenId !== "0" && (
                                        <Flex
                                            align={"center"}
                                            justify={"center"}
                                            flexDir={"column"}
                                            sx={{
                                                background: `url(${NewComerBg})`,
                                                width: "107px",
                                                height: "98px",
                                                position: "absolute",
                                                backgroundSize: "100% 100%",
                                                top: "50%",
                                                left:
                                                    item.comerPosition ===
                                                    "right"
                                                        ? "168px"
                                                        : "-114px",
                                                transform: `translate(0%,-50%) }`,
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
                                            <Image
                                                src={aviationImg(item.level)}
                                                sx={{
                                                    width: "72px",
                                                    height: "72px",
                                                }}
                                            ></Image>
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
                                                    {levelInfo[index].userName
                                                        ? levelInfo[index]
                                                              .userName
                                                        : `User-${shortenAddress(
                                                              levelInfo[index]
                                                                  .owner,
                                                              4,
                                                              3,
                                                          )}`}
                                                </Text>
                                                <Text
                                                    sx={{
                                                        width: "120px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {shortenAddress(
                                                        levelInfo[index].owner,
                                                    )}
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
                                    <Text
                                        sx={{
                                            position: "absolute",
                                            bottom: "30px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            fontSize: "30px",
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
                                            width: "48px",
                                            height: "48px",
                                            position: "absolute",
                                            bottom: "0",
                                            left: "50%",
                                            transform: "translate(-50%,40%)",
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
                                                    levelInfo?.[index]?.name
                                                        .length
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
            </Box>
            <LevelLeaderboardModal
                isOpen={isLeaderboardModalOpen}
                onClose={closeLeaderboardModal}
                list={currentLevelLeaderboard}
            ></LevelLeaderboardModal>
        </Box>
    );
};
export default AviationLevel;
