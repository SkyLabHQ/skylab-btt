import React, { useEffect } from "react";
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
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import AvatarBg from "./assets/avatar-bg.png";
import DefaultAvatar from "./assets/default-avatar.png";
import CopyIcon from "@/assets/copy-icon.svg";
import { aviationImg } from "@/utils/aviationImg";
import LevelDetailBg from "./assets/level-detail.png";
import Winner from "./assets/winner.png";
import CloseIcon from "@/assets/close.png";
import {
    useMultiMercuryJarTournamentContract,
    useMultiMercuryPilotsContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { ActivePilotRes, handlePilotsInfo1 } from "@/skyConstants/pilots";
import { shortenAddress } from "@/utils";
import { getLevel } from "@/utils/level";

const NewComer = ({ detail }: { detail: any }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const { onCopy } = useClipboard("12345");

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
                    width: isPc ? "230px" : "100px",
                    height: isPc ? "124px" : "56px",
                    background: `url(${Winner})`,
                    backgroundSize: "100% 100%",
                    // borderRadius: "50%",
                    position: "relative",
                }}
            >
                <Image
                    src={detail?.pilotImg ? detail.pilotImg : DefaultAvatar}
                    sx={{
                        width: "50px",
                        borderRadius: "50%",
                    }}
                ></Image>
            </Flex>
            <Box
                sx={{
                    color: "#181818",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: "14px",
                    border: "1px solid #f2d861",
                    width: "112px",
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
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { onCopy } = useClipboard("12345");

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
                        width: "50%",
                        borderRadius: "50%",
                    }}
                ></Image>
                <Flex
                    sx={{
                        background: `url(${AmountBg})`,
                        backgroundSize: "100% 100%",
                        width: isPc ? "28px" : "14px",
                        height: isPc ? "28px" : "14px",
                        position: "absolute",
                        top: isPc ? "10px" : "5px",
                        right: "0%",
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
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: isPc ? "12px" : "8px",
                    border: "1px solid #FFF",
                    width: isPc ? "112px" : "76px",
                    borderRadius: isPc ? "16px" : "8px",
                    height: isPc ? "28px" : "20px",
                    lineHeight: isPc ? "28px" : "20px",
                    background: "rgba(0,0,0,0.5)",
                    marginTop: "-2px",
                    zIndex: -1,
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
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const multiMercuryPilotsContract = useMultiMercuryPilotsContract(chainId);
    const [leaderBoardList, setLeaderBoardList] = React.useState<any[]>([]);
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [loading, setLoading] = React.useState(false);
    const toast = useSkyToast();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();

    const handleGetList = async () => {
        setLoading(true);
        const tokenIds = levelInfoDetail?.levelTokenIds;
        console.log(tokenIds, "tokenIdstokenIdstokenIds");
        const tokenIdCounts = {};
        tokenIds.forEach((tokenId: string) => {
            tokenIdCounts[tokenId] = (tokenIdCounts[tokenId] || 0) + 1;
        });

        let currentList = Object.entries(tokenIdCounts).map(
            ([tokenId, count]) => {
                return {
                    tokenId,
                    count,
                    owner: "",
                    points: "0",
                    userName: "",
                    pilotImg: "",
                };
            },
        );

        const p1: any = [];

        console.log(currentList, "currentList");
        currentList.forEach((item) => {
            p1.push(
                multiMercuryJarTournamentContract.ownerOf(item.tokenId),
                multiMercuryJarTournamentContract.aviationPoints(item.tokenId),
            );
        });

        const p1R = await multiProvider.all(p1);
        currentList = currentList.map((item, index) => {
            return {
                ...item,
                owner: p1R[index * 2],
                points: p1R[index * 2 + 1].toString(),
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

        currentList.forEach((item, index) => {
            item.userName = p2R[index * 2];
            allWallet.push(item.owner);
            activePilotRes.push(p2R[index * 2 + 1]);
        });

        const allPilot: ActivePilotRes[] = activePilotRes.map((item: any) => {
            return {
                ...item,
                pilotId: item.pilotId.toNumber(),
            };
        });

        const pilotList = await handlePilotsInfo1({
            chainId: chainId,
            allPilot,
        });

        currentList.forEach((item, index) => {
            item.pilotImg = pilotList[index].pilotImg;
        });

        currentList = currentList.filter((item) => {
            return item.owner !== levelInfoDetail?.owner;
        });

        setLeaderBoardList(currentList);
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
                        padding: "10px",
                    }}
                >
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
                            {getLevel(levelInfoDetail?.points)}
                        </span>
                    </Text>

                    <Box
                        sx={{
                            overflow: "auto",
                            height: isPc ? "600px" : "300px",
                        }}
                    >
                        {levelInfoDetail.tokenId !== "0" && (
                            <Box
                                sx={{
                                    background: `url(${LevelDetailBg}) no-repeat`,
                                    backgroundPosition: "bottom",
                                    backgroundSize: "contain",
                                    width: isPc ? "360px" : "160px",
                                    height: isPc ? "280px" : "130px",
                                    position: "relative",
                                    margin: "0 auto",
                                }}
                            >
                                <NewComer detail={levelInfoDetail}></NewComer>
                                <Text
                                    sx={{
                                        position: "absolute",
                                        bottom: isPc ? "50px" : "10px",
                                        fontWeight: "bold",
                                        left: "50%",
                                        transform: "translate(-50%,0)",
                                        color: "#F2D861",
                                        fontSize: isPc ? "20px" : "16px",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    NEW COMER
                                </Text>
                            </Box>
                        )}
                        <SimpleGrid
                            columns={isPc ? 5 : 3}
                            sx={{
                                marginTop: isPc ? "40px" : "20px",
                            }}
                            spacingY={"10px"}
                        >
                            {leaderBoardList
                                .concat(leaderBoardList)
                                .concat(leaderBoardList)
                                .concat(leaderBoardList)
                                .map((item, index) => {
                                    return (
                                        <InfoItem
                                            detail={item}
                                            key={index}
                                        ></InfoItem>
                                    );
                                })}
                        </SimpleGrid>
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
