import {
    Box,
    Image,
    NumberInput,
    NumberInputField,
    Text,
    useDisclosure,
    SimpleGrid,
    Flex,
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
    useMultiERC721Contract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { getMetadataImg } from "@/utils/ipfsImg";
import { PilotInfo } from "@/hooks/usePilotInfo";
import AllPilotList, { PilotBaseInfo } from "@/skyConstants/pilots";
import OpenSeaLink from "./assets/opensea-link.svg";
import PilotLock from "./assets/pilot-lock.svg";
import BackIcon from "./assets/simple-back.svg";
import { useChainId } from "wagmi";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

export const PilotItem = ({
    onClick,
    info,
}: {
    onClick: () => void;
    info: PilotBaseInfo;
}) => {
    const { img, name, openSeaUrl, disabled } = info;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
                border: "1px solid #FFF",
                background: disabled ? "#B1B1B1" : "rgb(182, 200, 202)",
                width: "100%",
                height: "54px",
                position: "relative",
                paddingLeft: "10px",
                cursor: disabled ? "no-drop" : "pointer",
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    position: "relative",
                    borderRadius: "5px",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={img}
                    sx={{
                        width: "38px",
                        height: "38px",
                        border: "2px solid #fff",
                        borderRadius: "5px",
                    }}
                ></Image>
                {disabled && (
                    <Box
                        sx={{
                            background: disabled && "rgba(0, 0, 0, 0.50)",
                            position: "absolute",
                            left: "0%",
                            top: "0%",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={PilotLock}
                            sx={{
                                width: "38px",
                            }}
                        ></Image>
                    </Box>
                )}
            </Box>
            <Box
                sx={{
                    paddingLeft: "26px",
                }}
            >
                <Text
                    sx={{
                        textAlign: "left",
                        fontSize: "16px",
                        color: disabled ? "#D9D9D9" : "#4A4A4A",
                    }}
                >
                    {name}
                </Text>
                {disabled && (
                    <Text
                        sx={{
                            textAlign: "left",
                            fontSize: "14px",
                            color: "#D9D9D9",
                        }}
                    >
                        Coming soon...
                    </Text>
                )}
            </Box>

            {openSeaUrl && (
                <Image
                    sx={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        borderRadius: "40px",
                        width: "80px",
                    }}
                    src={OpenSeaLink}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        window.open(openSeaUrl, "_blank");
                    }}
                ></Image>
            )}
        </Box>
    );
};

const SelectPilotCollections = ({
    totalSupplys,
    currentCollection,
    inputPilotId,
    handleInputPilotId,
    handleSelectPilotId,
    handlePilotIndex,
}: {
    totalSupplys: any;
    currentCollection: any;
    inputPilotId: string;
    handleInputPilotId: (value: string) => void;
    handleSelectPilotId: (value: PilotInfo) => void;
    handlePilotIndex: (value: number) => void;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: true,
    });
    const { signer, address } = usePrivyAccounts();
    const chainId = useChainId();
    const [currentMyNfts, setCurrentMyNfts] = useState([]);
    const [loading, setLoading] = useState(false);

    const multiERC721Contract = useMultiERC721Contract(
        currentCollection.address,
    );

    const multiProvider = useMultiProvider(currentCollection.chainId);

    const handleSelectSeries = (index: number) => {
        handlePilotIndex(index);
        onClose();
    };

    // get all exsit nft info
    const handleGetAllNft = async () => {
        setLoading(true);
        const [balance] = await multiProvider.all([
            multiERC721Contract.balanceOf(address),
        ]);

        const pilotIds = await multiProvider.all(
            new Array(balance.toNumber()).fill("").map((item, index) => {
                return multiERC721Contract.tokenOfOwnerByIndex(address, index);
            }),
        );

        const p = [];
        for (let i = 0; i < pilotIds.length; i++) {
            p.push(multiERC721Contract.tokenURI(pilotIds[i]));
            p.push(multiERC721Contract.ownerOf(pilotIds[i]));
        }
        const res = await multiProvider.all(p);

        setCurrentMyNfts(
            pilotIds.map((item: any, index: number) => {
                return {
                    pilotId: item.toNumber(),
                    img: getMetadataImg(res[index * 2]),
                    owner: res[index * 2 + 1],
                };
            }),
        );
        setLoading(false);
    };

    useEffect(() => {
        if (
            !currentCollection.enumerable ||
            !multiERC721Contract ||
            !multiProvider ||
            !address
        ) {
            return;
        }

        handleGetAllNft();
    }, [currentCollection, multiProvider, multiERC721Contract, address]);

    return (
        <Box
            sx={{
                border: "1px solid #fff",
                borderRadius: "10px",
                padding: "10px",
                minHeight: "210px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {isOpen ? (
                    <Text
                        sx={{
                            fontSize: "12px",
                        }}
                    >
                        Select Pilot from these colletions
                    </Text>
                ) : (
                    <Image
                        src={BackIcon}
                        sx={{
                            height: "16px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            onOpen();
                        }}
                    ></Image>
                )}
            </Box>

            <Box
                sx={{
                    position: "relative",
                    marginTop: "16px",
                }}
            >
                {isOpen ? (
                    <Box
                        sx={{
                            position: "absolute",
                            left: "0%",
                            top: "0%",
                            width: "100%",
                        }}
                    >
                        {AllPilotList[chainId].map(
                            (item: any, index: number) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            marginBottom: "6px",
                                        }}
                                    >
                                        <PilotItem
                                            onClick={() => {
                                                !item.disabled &&
                                                    handleSelectSeries(index);
                                            }}
                                            info={item}
                                        ></PilotItem>
                                    </Box>
                                );
                            },
                        )}
                    </Box>
                ) : (
                    <PilotItem
                        info={currentCollection}
                        onClick={onOpen}
                    ></PilotItem>
                )}

                {!isOpen && (
                    <Box
                        sx={{
                            marginTop: "15.9994px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "30px",
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: "12px",
                                }}
                            >
                                Input Token ID{" "}
                                {totalSupplys[currentCollection.address]
                                    ? `(${currentCollection.start} - ${
                                          totalSupplys[
                                              currentCollection.address
                                          ] -
                                          (currentCollection.start === 0
                                              ? 1
                                              : 0)
                                      })`
                                    : ""}
                            </Text>
                        </Box>
                        <NumberInput
                            variant="unstyled"
                            sx={{
                                borderRadius: "5px",
                                background: "#D9D9D9",
                                color: "#000",
                                paddingLeft: "10px",
                                width: "100%",
                                height: "36px",
                                marginTop: "4px",
                                lineHeight: "40px",
                                fontSize: "12px",
                            }}
                            value={inputPilotId}
                            onChange={(value) => {
                                handleInputPilotId(value);
                            }}
                        >
                            <NumberInputField />
                        </NumberInput>
                        {currentCollection.enumerable &&
                            currentMyNfts.length !== 0 && (
                                <SimpleGrid
                                    columns={4}
                                    spacingX={10}
                                    sx={{
                                        position: "relative",
                                        marginTop: "20px",
                                    }}
                                >
                                    {currentMyNfts.map((item) => {
                                        return (
                                            <Flex
                                                key={item.pilotId}
                                                onClick={() => {
                                                    handleSelectPilotId({
                                                        address:
                                                            currentCollection.address,
                                                        pilotId: item.pilotId,
                                                        img: item.img,
                                                        owner: item.owner,
                                                    });
                                                }}
                                                sx={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Image
                                                    src={item.img}
                                                    sx={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "10px",
                                                        border: "1px solid #fff",
                                                    }}
                                                ></Image>
                                                <Text>#{item.pilotId} </Text>
                                            </Flex>
                                        );
                                    })}
                                </SimpleGrid>
                            )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SelectPilotCollections;
