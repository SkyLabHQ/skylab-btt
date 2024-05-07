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
import ETHBg from "./assets/ETH-bg.png";
import ETHIcon from "./assets/eth.svg";
import DefaultAvatar from "./assets/default-avatar.png";
import { aviationImg } from "@/utils/aviationImg";
import Timer from "./Timer";
import NewComerBg from "./assets/newcomer-bg.png";
import { shortenAddress } from "@/utils";
import LevelLeaderboardModal from "./LevelLeaderboardModal";
import PaperIcon from "./assets/paper.png";
import LockIcon from "./assets/lock.png";
import { useUserInfo } from "@/contexts/UserInfo";
import { usePrivy } from "@privy-io/react-auth";
import useSkyToast from "@/hooks/useSkyToast";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

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
            width: "300px",
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
            right: "210px",
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
            top: "684px",
            width: "300px",
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
            left: "202px",
        },
        avatarDirection: "right",
    },

    {
        level: 12,
        position: {
            top: "1200px",
            left: "150px",
        },
        comerPosition: "left",
        arrowImg: LYellowIcon,
        imgPosition: {
            top: "1270px",
            width: "300px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        avatarDirection: "right",
    },
    {
        level: 11,
        position: {
            top: "1340px",
            right: "150px",
        },
        comerPosition: "right",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "1500px",
            right: "206px",
            width: "25px",
        },
        avatarDirection: "left",
    },
    {
        level: 10,
        position: {
            top: "1785px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: RYellowIcon,
        imgPosition: {
            top: "1840px",
            width: "300px",
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
        comerPosition: "left",
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "2080px",
            left: "202px",
            width: "25px",
        },
        avatarDirection: "right",
    },
    {
        level: 8,
        position: {
            top: "2365px",
            left: "150px",
        },
        comerPosition: "left",

        arrowImg: LYellowIcon,
        imgPosition: {
            top: "2420px",
            width: "300px",
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
            top: "2650px",
            width: "25px",
            right: "206px",
        },
        avatarDirection: "left",
    },
    {
        level: 6,
        position: {
            top: "2935px",
            right: "150px",
        },
        comerPosition: "right",

        arrowImg: RYellowIcon,
        imgPosition: {
            top: "2995px",
            width: "300px",
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
            top: "3220px",
            width: "25px",
            left: "202px",
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
            width: "300px",
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
            right: "206px",
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
            width: "300px",
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
            left: "202px",
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

const AviationLevel = ({
    levelInfo,
    totalPaper,
}: {
    levelInfo: any[];
    totalPaper: any;
}) => {
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfo();
    const { ready, authenticated, login, user, connectWallet } = usePrivy();
    const { address } = usePrivyAccounts();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const {
        isOpen: isLeaderboardModalOpen,
        onOpen: openLeaderboardModal,
        onClose: closeLeaderboardModal,
    } = useDisclosure();

    const [currentIndex, setCurrentIndex] = useState(0);
    const handleLeaderboard = (index: number) => {
        setCurrentIndex(index);
        openLeaderboardModal();
    };

    const handleLogin = () => {
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }

        if (user && user.wallet.walletClientType !== "privy") {
            connectWallet();
            return;
        }
        login();
    };

    const handleClickPaper = () => {
        if (!address) {
            handleLogin();
            return;
        }
        onUserInfoOpen();
    };

    useEffect(() => {
        // const blank = document.getElementById("blank");
        // blank.scrollIntoView(true);
    }, [isPc]);

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
                paddingTop: isPc ? "160px" : "80px",
            }}
        >
            <Box
                sx={{
                    width: isPc ? "880px" : "300px",
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
                                        width: isPc ? "130px" : "84px",
                                        height: isPc ? "130px" : "84px",
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
                                                            ? "148px"
                                                            : "-104px",
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
                                                    NEWCOMER
                                                </Text>
                                                <Flex
                                                    sx={{
                                                        background: `url(${NewComerBg})`,
                                                        width: "90px",
                                                        height: "82px",
                                                        backgroundSize:
                                                            "100% 100%",
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
                                                            width: "60px",
                                                            height: "60px",
                                                            borderRadius: "50%",
                                                        }}
                                                    ></Image>
                                                </Flex>

                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: "-24px",
                                                        width: "100%",
                                                        textAlign: "center",
                                                        fontFamily: "Quantico",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    <Text
                                                        sx={{
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

                                    {levelInfo[index].levelTokenIds.length !==
                                        0 && (
                                        <Flex
                                            sx={{
                                                position: "absolute",
                                                left: "50%",
                                                top: "-20%",
                                                transform: "translateX(-50%)",
                                                background: `url(${ETHBg})`,
                                                backgroundSize: "100% 100%",
                                                width: "65px",
                                                height: "65px",
                                                lineHeight: "1",
                                            }}
                                            flexDir={"column"}
                                            align={"center"}
                                        >
                                            <Image
                                                src={ETHIcon}
                                                sx={{
                                                    width: "20px",
                                                    marginTop: "-10px",
                                                }}
                                            ></Image>
                                            <Text
                                                sx={{
                                                    fontSize: "26px",
                                                    color: "#FFECC7",
                                                    fontFamily: "Neon",
                                                    fontWeight: "normal",
                                                }}
                                            >
                                                0.12
                                            </Text>
                                            <Text
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "normal",
                                                    fontFamily: "Neon",
                                                    color: "#FFECC7",
                                                }}
                                            >
                                                ETH
                                            </Text>
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
                                                    width: isPc
                                                        ? "34px"
                                                        : "24px",
                                                }}
                                            ></Image>
                                        </Flex>
                                    )}

                                    <Text
                                        sx={{
                                            position: "absolute",
                                            bottom: isPc ? "25px" : "15px",
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
                                            width: isPc ? "48px" : "36px",
                                            height: isPc ? "48px" : "36px",
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
                                                    fontSize: isPc
                                                        ? "16px"
                                                        : "12px",
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
                            cursor: "pointer",
                        }}
                        onClick={handleClickPaper}
                    >
                        <Flex
                            sx={{
                                width: isPc ? "130px" : "84px",
                                height: isPc ? "130px" : "84px",
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
                    id="blank"
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
