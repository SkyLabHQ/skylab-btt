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
                    width: "230px",
                    height: "124px",
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
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: "14px",
                    border: "1px solid #FFF",
                    width: "112px",
                    borderRadius: "16px",
                    height: "28px",
                    lineHeight: "28px",
                    background: "rgba(0,0,0,0.5)",
                    marginTop: "-5px",
                    zIndex: -1,
                }}
            >
                {`User-${shortenAddress(detail.owner, 4, 2)}`}
            </Box>
            <Flex
                onClick={handleCopy}
                sx={{
                    marginTop: "10px",
                    cursor: "pointer",
                }}
            >
                <Text
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    {shortenAddress(detail.owner, 4, 4)}
                </Text>
                <Image
                    src={CopyIcon}
                    sx={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "4px",
                    }}
                ></Image>
            </Flex>
        </Flex>
    );
};

const InfoItem = ({ detail }: { detail: any }) => {
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
                    width: "102px",
                    height: "102px",
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
                        width: "28px",
                        height: "28px",
                        position: "absolute",
                        top: "10px",
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
                    fontSize: "12px",
                    border: "1px solid #FFF",
                    width: "112px",
                    borderRadius: "16px",
                    height: "28px",
                    lineHeight: "28px",
                    background: "rgba(0,0,0,0.5)",
                    marginTop: "-5px",
                    zIndex: -1,
                }}
            >
                {detail.userName
                    ? detail.userName
                    : `User-${shortenAddress(detail.owner, 4, 2)}`}
            </Box>
            <Flex
                onClick={handleCopy}
                sx={{
                    marginTop: "10px",
                    cursor: "pointer",
                }}
            >
                <Text
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    {shortenAddress(detail.owner, 4, 4)}
                </Text>
                <Image
                    src={CopyIcon}
                    sx={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "4px",
                    }}
                ></Image>
            </Flex>
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
        const tokenIdCounts = {};
        console.log("先进来");
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

        currentList.forEach((item) => {
            p1.push(
                multiMercuryJarTournamentContract.ownerOf(item.tokenId),
                multiMercuryJarTournamentContract.aviationPoints(item.tokenId),
            );
        });

        const p1R = await multiProvider.all(p1);
        console.log("第一个mul");
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

    console.log(levelInfoDetail, "levelInfoDetail");

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent
                width={"800px"}
                maxWidth={"800px"}
                containerProps={{
                    sx: {
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
                    pb="0"
                    pt={"20px"}
                    sx={{
                        position: "relative",
                    }}
                >
                    <Image
                        src={aviationImg(levelInfoDetail?.level)}
                        sx={{
                            position: "absolute",
                            top: "0px",
                            width: "240px",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            textAlign: "right",
                            fontSize: "20px",
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
                                fontSize: "30px",
                            }}
                        >
                            Lvl.
                        </span>{" "}
                        <span
                            style={{
                                fontSize: "50px",
                            }}
                        >
                            {getLevel(levelInfoDetail?.points)}
                        </span>
                    </Text>

                    <Box
                        sx={{
                            overflow: "auto",
                            height: "600px",
                        }}
                    >
                        {levelInfoDetail.tokenId !== "0" && (
                            <Box
                                sx={{
                                    background: `url(${LevelDetailBg}) no-repeat`,
                                    backgroundPosition: "bottom",
                                    backgroundSize: "contain",
                                    width: "360px",
                                    height: "280px",
                                    position: "relative",
                                    margin: "0 auto",
                                }}
                            >
                                <NewComer detail={levelInfoDetail}></NewComer>
                                <Text
                                    sx={{
                                        position: "absolute",
                                        bottom: "50px",
                                        fontWeight: "bold",
                                        left: "50%",
                                        transform: "translate(-50%,0)",
                                        color: "#F2D861",
                                        fontSize: "20px",
                                    }}
                                >
                                    NEW COMER
                                </Text>
                            </Box>
                        )}
                        <SimpleGrid
                            columns={5}
                            sx={{
                                marginTop: "40px",
                            }}
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
                    </Box>
                </ModalBody>
                <Image
                    onClick={() => {
                        onClose();
                    }}
                    src={CloseIcon}
                    sx={{
                        width: "30px",
                        height: "30px",
                        position: "absolute",
                        right: "0",
                        top: "-48px",
                        cursor: "pointer",
                    }}
                ></Image>
            </ModalContent>
        </Modal>
    );
};

export default LevelLeaderboardModal;
