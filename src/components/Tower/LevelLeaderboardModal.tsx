import React, { useEffect, useMemo } from "react";
import {
    Text,
    Modal,
    ModalBody,
    ModalContent,
    Image,
    ModalOverlay,
    useMediaQuery,
    Flex,
    Box,
    SimpleGrid,
    useClipboard,
} from "@chakra-ui/react";
import AmountBg from "./assets/amount-bg.png";
import useSkyToast from "@/hooks/useSkyToast";
import AvatarBg from "./assets/avatar-bg.png";
import DefaultAvatar from "./assets/default-avatar.png";
import { aviationImg } from "@/utils/aviationImg";
import BiddingGif from "@/assets/bidding.gif";
import Winner from "./assets/winner.png";
import EmptyWinner from "./assets/empty-winner.png";
import CloseIcon from "@/assets/close.png";
import {
    useMultiMercuryJarTournamentContract,
    useMultiMercuryPilotsContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { ActivePilotRes, handlePilotsInfo1 } from "@/skyConstants/pilots";
import { shortenAddress } from "@/utils";
import { levelRanges } from "@/utils/level";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import useCountDown from "react-countdown-hook";
import HourglassIcon from "./assets/hourglass.png";
import ETHIcon from "./assets/eth.svg";

const Timer = ({ time }: { time: number }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [timeLeft, { start }] = useCountDown(5000, 1000);

    useEffect(() => {
        if (time === 0) {
            start(0);
            return;
        }
        const currentTime = new Date().getTime();
        if (time * 1000 > currentTime) {
            start(time * 1000 - currentTime);
            return;
        }
        start(0);
    }, [time]);

    const { minutes, second, hour } = useMemo(() => {
        let minutes: string | number = Math.floor((timeLeft / 60000) % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let second: string | number = Math.floor((timeLeft / 1000) % 60);
        if (second < 10) {
            second = `0${second}`;
        }

        let hour: string | number = Math.floor((timeLeft / 3600000) % 24);
        if (hour < 10) {
            hour = `0${hour}`;
        }

        return { minutes, second, hour };
    }, [timeLeft]);
    return (
        <Flex
            sx={{
                position: "absolute",
                top: isPc ? "-56px" : "-32px",
                width: isPc ? "290px" : "100px",
                left: "0%",
                backdropFilter: "blur(6.795704364776611px)",
                background: "rgba(0,0,0,0.15)",
                border: "1px solid #fff",
                borderRadius: "12px 12px 0 0",
                height: isPc ? "56px" : "32px",
                borderBottom: "none",
            }}
            align={"center"}
            justify={"center"}
        >
            {isPc && (
                <Image
                    src={HourglassIcon}
                    sx={{
                        width: "24px",
                        margin: "0 12px",
                    }}
                ></Image>
            )}
            <Box
                sx={{
                    fontSize: isPc ? "24px" : "12px",
                    zIndex: 999,
                    textAlign: "center",
                    lineHeight: isPc ? "48px" : "32px",
                }}
            >
                {hour}:{minutes}:{second}
            </Box>
        </Flex>
    );
};

const NewComer = ({ detail }: { detail: any }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const { onCopy } = useClipboard(detail.owner);

    const handleCopy = () => {
        onCopy();
        toast("Address copied");
    };

    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                paddingTop: "16px",
            }}
        >
            <Flex
                justify={"center"}
                align={"center"}
                sx={{
                    width: isPc ? "128px" : "48px",
                    height: isPc ? "128px" : "48px",
                    background: `url(${AvatarBg})`,
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    backgroundColor: "rgb(38,38,38)",
                    position: "relative",
                }}
            >
                <Image
                    src={detail.pilotImg ? detail.pilotImg : DefaultAvatar}
                    sx={{
                        width: detail.pilotImg ? "85%" : "50%",
                        borderRadius: "50%",
                    }}
                ></Image>
            </Flex>
            <Box
                sx={{
                    color: "#181818",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: isPc ? "14px" : "10px",
                    border: "1px solid #f2d861",
                    width: isPc ? "112px" : "76px",
                    borderRadius: "16px",
                    height: isPc ? "28px" : "14px",
                    lineHeight: isPc ? "28px" : "14px",
                    background: "#f2d861",
                }}
                onClick={handleCopy}
            >
                {detail.userName
                    ? detail.userName
                    : `${shortenAddress(detail.owner)}`}
            </Box>
        </Flex>
    );
};

const InfoItem = ({ detail }: { detail: any }) => {
    const { address } = usePrivyAccounts();
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { onCopy } = useClipboard(detail.owner);

    const isMe = useMemo(() => {
        if (!address) {
            return false;
        }

        if (address.toLocaleLowerCase() === detail.owner) {
            return true;
        }
    }, [address, detail.owner]);

    const handleCopy = () => {
        onCopy();
        toast("Address copied");
    };

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Flex
                justify={"center"}
                align={"center"}
                sx={{
                    width: isPc ? "102px" : "48px",
                    height: isPc ? "102px" : "48px",
                    background: `url(${AvatarBg})`,
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    backgroundColor: "rgb(38,38,38)",
                    position: "relative",
                }}
            >
                <Image
                    src={detail.pilotImg ? detail.pilotImg : DefaultAvatar}
                    sx={{
                        width: detail.pilotImg ? "85%" : "50%",
                        borderRadius: "50%",
                    }}
                ></Image>
                <Flex
                    sx={{
                        background: `url(${AmountBg})`,
                        backgroundSize: "100% 100%",
                        width: isPc ? "40px" : "32px",
                        height: isPc ? "40px" : "32px",
                        position: "absolute",
                        top: isPc ? "10px" : "-4px",
                        right: "-10px",
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
                            {detail.count}
                        </span>
                    </Box>
                </Flex>
            </Flex>
            <Box
                sx={{
                    color: isMe ? "#F2D861" : "#FFF",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: isPc ? "12px" : "8px",
                    fontWeight: isMe ? "bold" : "normal",
                    border: isMe ? "1px solid #F2D861" : "1px solid #FFF",
                    width: isPc ? "112px" : "76px",
                    borderRadius: isPc ? "16px" : "8px",
                    height: isPc ? "28px" : "20px",
                    lineHeight: isPc ? "28px" : "20px",
                    background: "rgba(0,0,0,0.5)",
                }}
                onClick={handleCopy}
            >
                {detail.userName
                    ? detail.userName
                    : `${shortenAddress(detail.owner)}`}
            </Box>
            <Text
                sx={{
                    fontSize: isPc ? "16px" : "12px",
                }}
            >
                Highest Pt:
            </Text>
            <Text
                sx={{
                    fontSize: isPc ? "16px" : "12px",
                }}
            >
                {detail.points}/
                <span
                    style={{
                        fontSize: isPc ? "12px" : "8px",
                    }}
                >
                    {detail.nextPoints}pt
                </span>
            </Text>
        </Flex>
    );
};

const LevelLeaderboardModal = ({
    levelInfoDetail,
    isOpen,
    onClose,
}: {
    levelInfoDetail: any;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const chainId = useChainId();
    const multiMercuryPilotsContract = useMultiMercuryPilotsContract(chainId);
    const [leaderBoardList, setLeaderBoardList] = React.useState<any[]>([]);
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [loading, setLoading] = React.useState(false);
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();

    const handleGetList = async () => {
        try {
            setLoading(true);
            const tokenIds: string[] = levelInfoDetail?.levelTokenIds;
            const p1: any = [];
            tokenIds.forEach((item: string) => {
                p1.push(
                    multiMercuryJarTournamentContract.ownerOf(item),
                    multiMercuryJarTournamentContract.aviationPoints(item),
                );
            });

            const p1R = await multiProvider.all(p1);
            let currentList = tokenIds.map((tokenId, index) => {
                const points = Number(p1R[index * 2 + 1].toString());
                const levelItem = levelRanges.find((item) => {
                    return points < item.maxPoints && points >= item.minPoints;
                });
                const level = levelItem.level;
                const nextPoints = levelItem.maxPoints;
                const prePoints = levelItem.minPoints;
                return {
                    tokenId: tokenId.toString(),
                    owner: p1R[index * 2],
                    points: p1R[index * 2 + 1].toString(),
                    level: level,
                    nextPoints: nextPoints,
                    prePoints: prePoints,
                };
            });

            const p2: any = [];

            currentList.forEach((item) => {
                p2.push(
                    multiMercuryJarTournamentContract.userName(item.owner),
                    multiMercuryPilotsContract.getActivePilot(item.owner),
                );
            });

            const p2R = await multiProvider.all(p2);

            const activePilotRes: any = [];

            const allWallet: string[] = [];

            currentList = currentList.map((item, index) => {
                allWallet.push(item.owner);
                activePilotRes.push(p2R[index * 2 + 1]);
                return {
                    ...item,
                    userName: p2R[index * 2],
                    pilotImg: "",
                };
            });

            const allPilot: ActivePilotRes[] = activePilotRes.map(
                (item: any) => {
                    return {
                        ...item,
                        pilotId: item.pilotId.toNumber(),
                    };
                },
            );

            const pilotList = await handlePilotsInfo1({
                chainId: chainId,
                allPilot,
            });

            currentList = currentList.map((item, index) => {
                return {
                    ...item,
                    pilotImg: pilotList[index].pilotImg,
                };
            });

            const newArray = Object.values(
                currentList.reduce((acc, curr) => {
                    const { owner, ...rest } = curr;
                    if (acc[owner]) {
                        acc[owner].count += 1;
                    } else {
                        acc[owner] = { owner, count: 1, ...rest };
                    }
                    return acc;
                }, {}),
            );

            setLoading(false);
            setLeaderBoardList(newArray);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            !isOpen ||
            !multiProvider ||
            !multiMercuryJarTournamentContract ||
            !multiMercuryPilotsContract ||
            !levelInfoDetail ||
            levelInfoDetail?.levelTokenIds?.length === 0
        ) {
            setLeaderBoardList([]);
            return;
        }

        handleGetList();
    }, [
        isOpen,
        levelInfoDetail,
        multiProvider,
        multiMercuryJarTournamentContract,
        multiMercuryPilotsContract,
    ]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent
                width={"100%"}
                maxWidth={"800px"}
                containerProps={{
                    sx: {
                        padding: "30px",
                        "&:focus-visible": {
                            outline: "none",
                        },
                    },
                }}
                bg="rgba(255, 255, 255, 0.15)"
                border="2px solid #FDDC2D"
                borderRadius="16px"
                sx={{
                    color: "#fff",
                    backdropFilter: "blur(33.97852325439453px)",
                }}
            >
                <ModalBody
                    sx={{
                        position: "relative",
                        padding: "0",
                    }}
                >
                    <Timer time={levelInfoDetail?.claimTime}></Timer>
                    <Image
                        src={aviationImg(levelInfoDetail?.level)}
                        sx={{
                            position: "absolute",
                            top: "0px",
                            width: isPc ? "240px" : "140px",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            textAlign: "right",
                            fontSize: isPc ? "20px" : "12px",
                        }}
                    >
                        Total {levelInfoDetail?.levelTokenIds?.length}
                    </Text>
                    <Text
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <span
                            style={{
                                fontSize: isPc ? "30px" : "16px",
                            }}
                        >
                            Lvl.
                        </span>{" "}
                        <span
                            style={{
                                fontSize: isPc ? "50px" : "24px",
                            }}
                        >
                            {levelInfoDetail?.level}
                        </span>
                    </Text>

                    <Box
                        sx={{
                            overflow: "auto",
                        }}
                    >
                        {
                            <Box
                                sx={{
                                    background: `url(${
                                        levelInfoDetail.tokenId !== "0"
                                            ? Winner
                                            : EmptyWinner
                                    }) no-repeat`,
                                    backgroundPosition: "bottom",
                                    backgroundSize: "contain",
                                    width: isPc ? "322px" : "161px",
                                    height: isPc ? "285px" : "142px",
                                    position: "relative",
                                    margin: "0 auto",
                                }}
                            >
                                {levelInfoDetail.tokenId !== "0" ? (
                                    <NewComer
                                        detail={levelInfoDetail}
                                    ></NewComer>
                                ) : (
                                    <Text
                                        sx={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "35%",
                                            transform: "translate(-50%,-50%)",
                                            fontSize: isPc ? "30px" : "20px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Empty
                                    </Text>
                                )}
                                <Text
                                    sx={{
                                        position: "absolute",
                                        bottom: isPc ? "60px" : "28px",
                                        fontWeight: "bold",
                                        left: "50%",
                                        transform: "translate(-50%,0)",
                                        color:
                                            levelInfoDetail.tokenId !== "0"
                                                ? "#000"
                                                : "#fff",
                                        fontSize: isPc ? "20px" : "14px",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    NEWCOMER
                                </Text>
                            </Box>
                        }
                        <Box
                            sx={{
                                borderBottom: "2px solid #FDDC2D",
                                borderRadius: "0 0 16px 16px",
                                height: isPc ? "300px" : "100px",
                            }}
                        >
                            {loading ? (
                                <Flex
                                    flexDir={"column"}
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        marginTop: isPc ? "40px" : "20px",
                                    }}
                                >
                                    <Image
                                        src={BiddingGif}
                                        sx={{
                                            width: isPc ? "160px" : "50px",
                                        }}
                                    ></Image>
                                </Flex>
                            ) : (
                                <SimpleGrid
                                    columns={isPc ? 5 : 3}
                                    sx={{
                                        marginTop: isPc ? "40px" : "20px",
                                    }}
                                    spacingY={"10px"}
                                >
                                    {leaderBoardList.map((item, index) => {
                                        return (
                                            <InfoItem
                                                detail={item}
                                                key={index}
                                            ></InfoItem>
                                        );
                                    })}
                                </SimpleGrid>
                            )}
                        </Box>

                        <Flex
                            justify={"center"}
                            align={"center"}
                            sx={{
                                fontSize: isPc ? "40px" : "18px",
                                color: "#FFECC7",
                                fontFamily: "Neon",
                                height: isPc ? "80px" : "32px",
                            }}
                        >
                            <Image
                                src={ETHIcon}
                                sx={{
                                    width: isPc ? "20px" : "12px",
                                    marginRight: isPc ? "24px" : "8px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    marginRight: isPc ? "12px" : "8px",
                                }}
                            >
                                0.12
                            </Text>
                            <Text>ETH</Text>
                        </Flex>
                    </Box>
                </ModalBody>
                <Image
                    onClick={() => {
                        onClose();
                    }}
                    src={CloseIcon}
                    sx={{
                        width: isPc ? "30px" : "18px",
                        height: isPc ? "30px" : "18px",
                        position: "absolute",
                        right: "0",
                        top: isPc ? "-48px" : "-24px",
                        cursor: "pointer",
                    }}
                ></Image>
            </ModalContent>
        </Modal>
    );
};

export default LevelLeaderboardModal;
