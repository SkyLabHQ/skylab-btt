import {
    Box,
    Text,
    Image,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    useClipboard,
    useMediaQuery,
} from "@chakra-ui/react";
import SupportIcon from "./assets/support.svg";
import React, { useEffect, useMemo, useState } from "react";
import {
    useMultiMercuryPilotsContract,
    useMultiMercuryTouramentContract,
    useMultiPilotMileageContract,
    useMultiPilotNetPointsContract,
    useMultiPilotWinStreakContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { shortenAddress } from "@/utils";
import GrayArrow from "./assets/gray-arrow.svg";
import Loading from "../Loading";
import { ActivePilotRes, handlePilotsInfo } from "@/skyConstants/pilots";
import { DEAFAULT_CHAINID } from "@/utils/web3Utils";
import { ZERO_DATA } from "@/skyConstants";
import useSkyToast from "@/hooks/useSkyToast";
import { RankBackground, RankMedal } from "@/skyConstants/rank";
import { getMetadataImg } from "@/utils/ipfsImg";

const colors = [
    "#96D1F2",
    "#FFA5C9",
    "#FFF47D",
    "#C8E469",
    "#8DEABD",
    "#FFC0FC",
    "#FFCA9F",
    "#F19E8A",
    "#B497E5",
    "#7D9BFF",
    "#CFC2BE",
];

function getColorByNumber(number: number) {
    const index = Math.abs(number) % colors.length; // 使用绝对值来确保索引是非负数
    return colors[index];
}

enum MenuProps {
    EstateScore = "Estate Score",
    Mileage = "Mileage",
    WinStreak = "Longest Win Streak",
    NetPoints = "Net Point Transferred",
    AviationLevel = "Aviation Level",
}

const ListItem = ({
    rank,
    detail,
    valueContent,
}: {
    rank: number;
    detail: any;
    valueContent?: React.ReactNode;
}) => {
    const { pilotImg, pilotOwner, actualPilotOwner } = detail;
    const toast = useSkyToast();
    const { onCopy } = useClipboard(pilotOwner);

    const isTop3 = useMemo(() => {
        return [1, 2, 3].includes(rank);
    }, [rank]);

    const handleOnCopy = () => {
        onCopy();
        toast("Copy address success");
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: isTop3 ? "48px" : "40px",
                alignItems: "center",
                background: RankBackground[rank],
                padding: "0 12px 0 6px",
                borderRadius: isTop3 ? "8px" : "0",
                marginBottom: "4px",
                borderBottom: "1px solid #fff",
            }}
        >
            {isTop3 ? (
                <Image
                    src={RankMedal[rank]}
                    sx={{
                        width: "32px",
                        height: "32px",
                        marginRight: "1.1458vw",
                    }}
                ></Image>
            ) : (
                <Text
                    sx={{
                        width: "32px",
                        marginRight: "12px",
                        fontSize: "16px",
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    {rank}
                </Text>
            )}

            <Box
                sx={{
                    position: "relative",
                    width: isTop3 ? "40px" : "36px",
                    height: isTop3 ? "40px" : "36px",
                }}
            >
                {pilotImg ? (
                    <Image
                        src={pilotImg}
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: "1px solid #fff",
                            borderRadius: "8px",
                        }}
                    ></Image>
                ) : (
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: getColorByNumber(rank),
                            border: "1px solid #fff",
                            borderRadius: "8px",
                        }}
                    ></Box>
                )}

                {pilotImg && pilotOwner !== actualPilotOwner && (
                    <Image
                        src={SupportIcon}
                        sx={{
                            width: "110%",
                            position: "absolute",
                            bottom: "-4px",
                            left: "50%",
                            maxWidth: "110%",
                            transform: "translateX(-50%)",
                        }}
                    ></Image>
                )}
            </Box>

            <Text
                sx={{
                    flex: 1,
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "14px",
                    cursor: "pointer",
                }}
                onClick={handleOnCopy}
            >
                {shortenAddress(pilotOwner)}
            </Text>
            {valueContent}
        </Box>
    );
};

const ValueContent = ({ detail }: { detail: any }) => {
    const { value } = detail;
    return (
        <Text
            sx={{
                color: "#BCBBBE",
                fontSize: "12px",
            }}
        >
            {value}
        </Text>
    );
};

const AviationContent = ({ detail }: { detail: any }) => {
    const { level, aviationPoint } = detail;
    return (
        <Box
            sx={{
                color: "#BCBBBE",
                textAlign: "right",
                fontFamily: "Quantico",
                fontSize: "12px",
            }}
        >
            <Text>Lvl {level}</Text>
            <Text>{aviationPoint}pt</Text>
        </Box>
    );
};

const GameLeaderboard = ({ show }: { show?: boolean }) => {
    const multiProvider = useMultiProvider(DEAFAULT_CHAINID);
    const multiMercuryTouramentContract =
        useMultiMercuryTouramentContract(DEAFAULT_CHAINID);
    const multiPilotMileageContract =
        useMultiPilotMileageContract(DEAFAULT_CHAINID);
    const multiPilotWinStreakContract =
        useMultiPilotWinStreakContract(DEAFAULT_CHAINID);
    const multiPilotNetPointsContract =
        useMultiPilotNetPointsContract(DEAFAULT_CHAINID);
    const multiMercuryPilotsContract =
        useMultiMercuryPilotsContract(DEAFAULT_CHAINID);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentMenu, setCurrentMenu] = useState(MenuProps.WinStreak);
    const menu = [
        {
            name: "Mileage",
            value: MenuProps.Mileage,
        },
        {
            name: "Net Point Transferred",
            value: MenuProps.NetPoints,
        },
        {
            name: "Longest Win Streak",
            value: MenuProps.WinStreak,
        },
        {
            name: "Aviation Level",
            value: MenuProps.AviationLevel,
        },
    ];

    const handleGetMileage = async () => {
        try {
            setLoading(true);
            const p = [];
            for (let i = 0; i <= 15; i++) {
                p.push(multiPilotMileageContract.getPilotMileageGroup(i));
            }

            const res = await multiProvider.all(p);
            const allPilot = [];
            const pMileageRequest: any = [];
            for (let i = 0; i <= 15; i++) {
                for (let j = 0; j < res[i].length; j++) {
                    const item = res[i][j];
                    if (
                        item.collectionAddress !== ZERO_DATA &&
                        item.pilotId.toNumber() !== 0
                    ) {
                        allPilot.push({
                            collectionAddress: item.collectionAddress,
                            pilotId: item.pilotId.toNumber(),
                        });
                        pMileageRequest.push(
                            multiPilotMileageContract.getPilotMileage(
                                item.collectionAddress,
                                item.pilotId,
                            ),
                        );
                    }
                }
            }

            const mileageRes = await multiProvider.all(pMileageRequest);

            const list = await handlePilotsInfo({
                chainId: DEAFAULT_CHAINID,
                values: mileageRes.map((item) => item.toNumber()),
                allPilot,
            });

            setList(
                list.filter((item) => {
                    return (
                        item.pilotOwner !== ZERO_DATA &&
                        item.actualPilotOwner !== ZERO_DATA
                    );
                }),
            );
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setList([]);
        }
    };

    const handleGetWinStreak = async () => {
        try {
            setLoading(true);
            const p = [];
            for (let i = 0; i <= 15; i++) {
                p.push(multiPilotWinStreakContract.getPilotWinStreakGroup(i));
            }
            const res = await multiProvider.all(p);

            const allWallet: string[] = [];
            const pPilotAndWinStreak: any = [];
            for (let i = 0; i <= 15; i++) {
                for (let j = 0; j < res[i].length; j++) {
                    const item = res[i][j];
                    if (item !== ZERO_DATA) {
                        allWallet.push(item);
                        pPilotAndWinStreak.push(
                            multiMercuryPilotsContract.getActivePilot(item),
                            multiPilotWinStreakContract.getPilotWinStreak(item),
                        );
                    }
                }
            }

            const pilotAndWinStreakRes = await multiProvider.all(
                pPilotAndWinStreak,
            );

            const allPilot: ActivePilotRes[] = [];
            const allPilotWinStreak: number[] = [];

            pilotAndWinStreakRes.forEach((item, index) => {
                if (index % 2 === 0) {
                    allPilot.push({
                        collectionAddress: item.collectionAddress,
                        pilotId: item.pilotId.toNumber(),
                    });
                } else {
                    allPilotWinStreak.push(item.toNumber());
                }
            });

            const list = await handlePilotsInfo({
                chainId: DEAFAULT_CHAINID,
                values: allPilotWinStreak,
                allPilot,
                pilotOwners: allWallet,
            });

            setList(list);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setList([]);
        }
    };

    const handleGetNetPoints = async () => {
        try {
            setLoading(true);
            const p = [];
            for (let i = 0; i <= 15; i++) {
                p.push(multiPilotNetPointsContract.getPilotNetPointsGroup(i));
            }
            const res = await multiProvider.all(p);
            const allWallet: string[] = [];

            const pPilotNetPoints: any = [];

            for (let i = 0; i <= 15; i++) {
                for (let j = 0; j < res[i].length; j++) {
                    const item = res[i][j];
                    if (item !== ZERO_DATA) {
                        allWallet.push(item);
                        pPilotNetPoints.push(
                            multiMercuryPilotsContract.getActivePilot(item),
                            multiPilotNetPointsContract.getPilotNetPoints(item),
                        );
                    }
                }
            }

            const pilotNetPointsRes = await multiProvider.all(pPilotNetPoints);
            const allPilot: ActivePilotRes[] = [];
            const allPilotNetPoints: string[] = [];

            pilotNetPointsRes.forEach((item, index) => {
                if (index % 2 === 0) {
                    allPilot.push({
                        collectionAddress: item.collectionAddress,
                        pilotId: item.pilotId.toNumber(),
                    });
                } else {
                    allPilotNetPoints.push(item.toNumber());
                }
            });

            const list = await handlePilotsInfo({
                chainId: DEAFAULT_CHAINID,
                values: allPilotNetPoints,
                allPilot,
                pilotOwners: allWallet,
            });

            setList(
                list.map((item) => {
                    return { ...item, value: item.value + "pt" };
                }),
            );
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setList([]);
        }
    };

    const handleGetAviationLevel = async () => {
        try {
            setLoading(true);

            const [round] = await multiProvider.all([
                multiMercuryTouramentContract._currentRound(),
            ]);

            const [infos] = await multiProvider.all([
                multiMercuryTouramentContract.leaderboardInfo(round.toNumber()),
            ]);

            const list = infos
                .map((item: any) => {
                    return {
                        level: item.level.toNumber(),
                        tokenId: item.tokenId.toNumber(),
                    };
                })
                .filter((cItem: any) => {
                    return cItem.level !== 0;
                })
                .sort((a: any, b: any) => {
                    return b.level - a.level;
                });

            const length = list.length;
            const p = [];
            for (let j = 0; j < length; j++) {
                p.push(multiMercuryTouramentContract.tokenURI(list[j].tokenId));
                p.push(multiMercuryTouramentContract.ownerOf(list[j].tokenId));
                p.push(
                    multiMercuryTouramentContract.aviationPoints(
                        list[j].tokenId,
                    ),
                );
            }
            const aviationInfoRes = await multiProvider.all(p);

            const aviationPionts: string[] = [];
            const pActivePilot: any = [];
            const allWallet: string[] = [];
            list.forEach((item: any, index: number) => {
                aviationPionts.push(aviationInfoRes[index * 3 + 2].toNumber());
                pActivePilot.push(
                    multiMercuryPilotsContract.getActivePilot(
                        aviationInfoRes[index * 3 + 1],
                    ),
                );
                allWallet.push(aviationInfoRes[index * 3 + 1]);
            });

            const activePilotRes = await multiProvider.all(pActivePilot);

            const allPilot: ActivePilotRes[] = activePilotRes.map(
                (item: any) => {
                    return {
                        ...item,
                        pilotId: item.pilotId.toNumber(),
                    };
                },
            );

            const pilotList = await handlePilotsInfo({
                chainId: DEAFAULT_CHAINID,
                allPilot,
                values: aviationPionts,
                pilotOwners: allWallet,
            });

            const finalRes = list.map((cItem: any, index: number) => {
                return {
                    ...cItem,
                    ...pilotList[index],
                    aviationImg: getMetadataImg(aviationInfoRes[index * 3]),
                    aviationOwner: aviationInfoRes[index * 3 + 1],
                    aviationPoint: aviationInfoRes[index * 3 + 2].toNumber(),
                };
            });

            setLoading(false);
            setList(finalRes);
        } catch (error) {
            setLoading(false);
            setList([]);
            console.log(error);
        }
    };

    useEffect(() => {
        if (
            !multiPilotMileageContract ||
            !multiPilotWinStreakContract ||
            !multiMercuryPilotsContract
        ) {
            return;
        }

        if (currentMenu === MenuProps.WinStreak) {
            handleGetWinStreak();
        } else if (currentMenu === MenuProps.Mileage) {
            handleGetMileage();
        } else if (currentMenu === MenuProps.NetPoints) {
            handleGetNetPoints();
        } else if (currentMenu === MenuProps.AviationLevel) {
            handleGetAviationLevel();
        }
    }, [
        currentMenu,
        multiPilotMileageContract,
        multiPilotWinStreakContract,
        multiMercuryPilotsContract,
    ]);

    return (
        <Box
            sx={{
                height: "100%",
                borderRadius: "8px",
                border: "2px solid #F2D861",
                background: "#424242",
                width: "100%",
                // opacity: show ? 1 : 0,
                transition: "all 0.3s",
                display: show ? "block" : "none",
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    height: "30px",
                    background:
                        "linear-gradient(180deg, rgba(99, 99, 99, 0.10) 0%, #636363 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                }}
            >
                <Text
                    sx={{
                        fontSize: "16px",
                        color: "#fff",
                    }}
                >
                    Leaderboard{" "}
                </Text>
            </Box>
            <Box>
                <Box
                    sx={{
                        padding: "0 8px",
                    }}
                >
                    <Menu autoSelect={false}>
                        {({ isOpen }) => (
                            <>
                                <MenuButton>
                                    <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <Image
                                            src={GrayArrow}
                                            sx={{
                                                marginRight: "5px",
                                                transform: isOpen
                                                    ? "rotate(270deg)"
                                                    : "rotate(0deg)",
                                                width: "12px",
                                            }}
                                        ></Image>
                                        <Text
                                            sx={{
                                                color: "#BCBBBE",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {currentMenu}
                                        </Text>
                                    </Box>
                                </MenuButton>
                                <MenuList
                                    sx={{
                                        background: "#4A4A4A",
                                    }}
                                >
                                    {menu.map((item, index) => {
                                        return (
                                            <MenuItem
                                                onClick={() => {
                                                    setCurrentMenu(item.value);
                                                }}
                                                key={index}
                                                sx={{
                                                    color: "#BCBBBE",
                                                    fontSize: "16px",
                                                    paddingLeft: "10px",
                                                    background: "#4A4A4A",
                                                }}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </>
                        )}
                    </Menu>
                </Box>
                <Box
                    sx={{
                        height: "400px",
                        overflowY: "overlay",
                        padding: "0 12px",
                    }}
                >
                    {loading ? (
                        <Loading></Loading>
                    ) : (
                        list
                            .concat(list)
                            .concat(list)
                            .concat(list)
                            .map((item, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        detail={item}
                                        rank={index + 1}
                                        valueContent={
                                            currentMenu ===
                                            MenuProps.AviationLevel ? (
                                                <AviationContent
                                                    detail={item}
                                                ></AviationContent>
                                            ) : (
                                                <ValueContent
                                                    detail={item}
                                                ></ValueContent>
                                            )
                                        }
                                    ></ListItem>
                                );
                            })
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default GameLeaderboard;
