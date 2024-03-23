import { Box, Image, Flex, Text, Input, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import LeftArrow from "./assets/left-arrow.png";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import DeafaultIcon from "./assets/default-icon.png";
import UnkonwPilot from "./assets/unknow-pilot.png";
import ExchangeIcon from "./assets/exchange.png";
import { useChainId, usePublicClient } from "wagmi";
import AllPilotList, {
    getIsSpecialPilot,
    getSpecialPilotImg,
} from "@/skyConstants/pilots";
import OpenSeaLink from "./assets/opensea-link.svg";
import BackIcon from "./assets/pilot-back.png";
import {
    getMultiDelegateERC721Contract,
    getMultiERC721Contract,
    getMultiProvider,
} from "@/hooks/useMultiContract";
import useSkyToast from "@/hooks/useSkyToast";
import { ZERO_DATA } from "@/skyConstants";
import { getPilotImgFromUrl } from "@/utils/ipfsImg";
import { useMercuryPilotsContract } from "@/hooks/useContract";
import { handleError } from "@/utils/error";
import { usePilotInfo } from "@/hooks/usePilotInfo";

const SetPilot = ({
    onChangeMode,
}: {
    onChangeMode: (mode: number) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { address } = usePrivyAccounts();
    const publicClient = usePublicClient();
    const [totalSupplys, setTotalSupplys] = useState({});

    const toast = useSkyToast();
    const mercuryPilotsContract = useMercuryPilotsContract();
    const { activePilot, handleGetActivePilot } = usePilotInfo(address);

    const [previewPilot, setPreviewPilot] = React.useState<any>(null);
    const [inputPilotId, setInputPilotId] = React.useState("");
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const chainId = useChainId();

    const pilotList = useMemo(() => {
        if (!chainId) {
            return [];
        }
        return AllPilotList[chainId];
    }, [chainId]);
    const currentCollection = useMemo(() => {
        if (currentIndex === -1 || pilotList.length === 0) {
            return null;
        }
        return pilotList[currentIndex];
    }, [currentIndex, pilotList]);

    const handleSearchTokenId = async () => {
        try {
            const currentCollection = pilotList[currentIndex];
            let tokenURI, owner;
            const collectionAddress = currentCollection.address;
            const isSpecialPilot = getIsSpecialPilot(currentCollection.address);
            const multiDelegateERC721Contract = getMultiDelegateERC721Contract(
                currentCollection.chainId,
            );
            const multiProvider = getMultiProvider(currentCollection.chainId);
            if (isSpecialPilot) {
                tokenURI = getSpecialPilotImg(collectionAddress, inputPilotId);
                [owner] = await multiProvider.all([
                    multiDelegateERC721Contract.ownerOf(
                        collectionAddress,
                        inputPilotId,
                    ),
                ]);
            } else {
                [tokenURI, owner] = await multiProvider.all([
                    multiDelegateERC721Contract.tokenURI(
                        collectionAddress,
                        inputPilotId,
                    ),
                    multiDelegateERC721Contract.ownerOf(
                        currentCollection.address,
                        inputPilotId,
                    ),
                ]);
            }

            if (owner === ZERO_DATA) {
                toast("Token ID does not exist");
                return;
            }
            const img = isSpecialPilot
                ? tokenURI
                : await getPilotImgFromUrl(tokenURI);

            const pilotInfo = {
                ...currentCollection,
                pilotId: Number(inputPilotId),
                img,
                owner,
            };
            setPreviewPilot(pilotInfo);
        } catch (e) {
            console.log(e, "e");
            toast("Token ID does not exist");
        }
    };

    const handleSetActive = async () => {
        try {
            // setActiveLoading(true);
            const res = await mercuryPilotsContract.write.setActivePilot([
                previewPilot.address,
                previewPilot.pilotId,
                address,
            ]);

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash: res,
            });

            if (receipt.status != "success") {
                toast("Transaction failed");
                return;
            }
            // setActiveLoading(false);
            setPreviewPilot(null);
            setTimeout(() => {
                handleGetActivePilot();
            }, 1000);
        } catch (e) {
            toast(handleError(e));
            // setActiveLoading(false);
        }
    };

    const handleGetAllTotalSupply = async () => {
        if (currentCollection.address === "") {
            return;
        }

        if (totalSupplys[currentCollection.address]) {
            return;
        }

        const multiProvider = getMultiProvider(currentCollection.chainId);
        const multiDelegateERC721Contract = getMultiERC721Contract(
            currentCollection.address,
        );

        const [totalSupply] = await multiProvider.all([
            multiDelegateERC721Contract.totalSupply(),
        ]);

        const temTotalSupplys = {
            ...totalSupplys,
            [currentCollection.address]: totalSupply.toNumber(),
        };

        setTotalSupplys(temTotalSupplys);
    };

    useEffect(() => {
        if (!currentCollection) {
            return;
        }
        handleGetAllTotalSupply();
    }, [currentCollection]);

    return (
        <Flex
            sx={{
                height: "100%",
                paddingBottom: "20px",
            }}
            flexDir={"column"}
            justifyContent={"space-between"}
        >
            <Box>
                <Flex
                    align={"center"}
                    sx={{
                        height: "30px",
                    }}
                >
                    <Image
                        onClick={() => onChangeMode(0)}
                        src={LeftArrow}
                        sx={{
                            width: "24px",
                        }}
                    ></Image>
                </Flex>
                <Flex flexDir={"column"} align={"center"}>
                    <Flex align={"center"}>
                        <Image
                            src={
                                activePilot?.img
                                    ? activePilot?.img
                                    : DeafaultIcon
                            }
                            sx={{
                                width: "78px",
                                borderRadius: "50%",
                            }}
                        ></Image>
                        <Image
                            src={ExchangeIcon}
                            sx={{
                                width: "36px",
                                margin: "0 16px",
                            }}
                        ></Image>
                        <Image
                            src={previewPilot ? previewPilot?.img : UnkonwPilot}
                            sx={{
                                width: "78px",
                                borderRadius: "50%",
                            }}
                        ></Image>
                    </Flex>

                    <Box
                        sx={{
                            marginTop: "20px",
                            height: "24px",
                            width: "100%",
                        }}
                    >
                        {currentIndex >= 0 ? (
                            <Image
                                onClick={() => {
                                    setCurrentIndex(-1);
                                    setInputPilotId("");
                                }}
                                src={BackIcon}
                                sx={{
                                    height: "24px",
                                    cursor: "pointer",
                                }}
                            ></Image>
                        ) : (
                            <Text
                                sx={{
                                    fontSize: "16px",
                                    fontFamily: "Orbitron",
                                }}
                            >
                                Select Pilot from these collections
                            </Text>
                        )}
                    </Box>
                </Flex>
                <Box
                    sx={{
                        marginTop: "40px",
                    }}
                >
                    {pilotList.length > 0 &&
                        pilotList.map((item: any, index: number) => {
                            return (
                                (currentIndex === -1 ||
                                    currentIndex === index) && (
                                    <Flex
                                        key={index}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                        }}
                                        align={"center"}
                                        justify={"space-between"}
                                        sx={{
                                            border: "2px solid #fff",
                                            marginBottom: "15px",
                                            borderRadius: "10px",
                                            padding: "6px 12px",
                                            background: "rgba(0, 0, 0, 0.50)",
                                        }}
                                    >
                                        <Flex align={"center"}>
                                            <Image
                                                src={item.img}
                                                sx={{
                                                    width: isPc
                                                        ? "54px"
                                                        : "46px",
                                                    height: isPc
                                                        ? "54px"
                                                        : "46px",
                                                    borderRadius: "10px",
                                                    border: "2px solid #fff",
                                                    marginRight: "22px",
                                                }}
                                            ></Image>
                                            <Text
                                                sx={{
                                                    fontSize: isPc
                                                        ? "20px"
                                                        : "14px",
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                        </Flex>

                                        {item.openSeaUrl && (
                                            <Image
                                                sx={{
                                                    borderRadius: "40px",
                                                    width: "76px",
                                                }}
                                                src={OpenSeaLink}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    window.open(
                                                        item.openSeaUrl,
                                                        "_blank",
                                                    );
                                                }}
                                            ></Image>
                                        )}
                                    </Flex>
                                )
                            );
                        })}
                </Box>
                {currentIndex >= 0 && (
                    <Box>
                        <Text>
                            In-put Token Id{" "}
                            {totalSupplys[currentCollection.address]
                                ? `(${currentCollection.start} - ${
                                      totalSupplys[currentCollection.address] -
                                      (currentCollection.start === 0 ? 1 : 0)
                                  })`
                                : ""}
                        </Text>
                        <Input
                            variant={"unstyled"}
                            sx={{
                                width: "100%",
                                height: "40px",
                                background: "#D9D9D9",
                                marginTop: "15px",
                                fontSize: "20px",
                                color: "#000",
                                paddingLeft: "10px",
                            }}
                            value={inputPilotId}
                            onChange={(e) => setInputPilotId(e.target.value)}
                        ></Input>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    "&>div": {
                        height: isPc ? "64px" : "40px",
                        width: isPc ? "280px" : "180px",
                        borderRadius: isPc ? "24px" : "12px",
                        fontSize: isPc ? "28px" : "14px",
                        fontWeight: 700,
                        fontFamily: "Orbitron",
                    },
                }}
            >
                <Flex
                    onClick={handleSearchTokenId}
                    align={"center"}
                    justify={"center"}
                    sx={{
                        background: inputPilotId ? "#F2D861" : "#777",
                        fontWeight: 700,
                        color: inputPilotId ? "#1b1b1b" : "#999",
                        margin: "0 auto",
                        backdropFilter: "blur(6.795704364776611px)",
                        cursor: inputPilotId ? "pointer" : "not-allowed",
                    }}
                >
                    Preview
                </Flex>
                <Flex
                    onClick={handleSetActive}
                    align={"center"}
                    justify={"center"}
                    sx={{
                        background: previewPilot ? "#F2D861" : "#777",

                        color: previewPilot ? "#1b1b1b" : "#999",
                        margin: isPc ? "28px auto 0" : "20px auto 0",
                        backdropFilter: "blur(6.795704364776611px)",
                        cursor: previewPilot ? "pointer" : "not-allowed",
                    }}
                >
                    Set Active
                </Flex>
            </Box>
        </Flex>
    );
};
export default SetPilot;
