import { Box, Image, Text, Button, useMediaQuery } from "@chakra-ui/react";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import OldWhite from "./assets/old-white.svg";
import OldYellow from "./assets/old-yellow.svg";
import FindYellow from "./assets/find-yellow.svg";
import FindWhite from "./assets/find-white.svg";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import styled from "@emotion/styled";
import { MMyPilotXp, MyPilotXp } from "./PilotXp";
import ExchangeIcon from "./assets/exchange.svg";
import MyPilot from "./MyPilot";
import UnknownPilotIcon from "./assets/unknow-pilot2.svg";
import { useChainId } from "wagmi";
import MSelectPilotCollections from "./MSelectPilotCollections";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

const CustomButton = styled(Button)`
    width: 10.4167vw;
    height: 2.6042vw;
    border-radius: 1.5625vw;
    font-size: 1.0417vw;
    font-weight: 900;
    background: #d9d9d9;
    color: #000;
    &[disabled] {
        color: #636363;
        background: #ABABAB; 
        opacity: 1;
    }
    &[disabled]:hover {
        color: #636363;
        background: #ABABAB;
        opacity: 1;
    },
`;

export interface SelectPilotInfo {
    address: string;
    tokenId: number;
    img?: string;
    xp?: number;
}

const MCurrentPilot = ({
    inputPilotId,
    totalSupplys,
    currentCollection,
    activePilot,
    selectPilotInfo,
    onNextRound,
    handleSetActive,
    handleSearchTokenId,
    handleInputPilotId,
    handleSelectPilotId,
    handlePilotIndex,
}: {
    inputPilotId: string;
    totalSupplys: any;
    currentCollection: any;
    selectPilotInfo: PilotInfo;
    activePilot: PilotInfo;
    onNextRound: (step: number | string) => void;
    handleSetActive: () => void;
    handleSearchTokenId: () => void;
    handleInputPilotId: (value: string) => void;
    handleSelectPilotId: (value: PilotInfo) => void;
    handlePilotIndex: (value: number) => void;
}) => {
    const { signer, address } = usePrivyAccounts();
    const chainId = useChainId();

    return (
        <Box
            sx={{
                height: "100%",
                padding: "52px 16px 0",
            }}
        >
            <Box
                sx={{
                    margin: "0 auto",
                    position: "relative",
                    borderTop: "1px solid #fff",
                    height: "100%",
                }}
            >
                <Box>
                    <Text
                        sx={{
                            fontSize: "16px",
                        }}
                    >
                        Current Pilot{" "}
                    </Text>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "10px",
                            }}
                        >
                            <MyPilot
                                img={activePilot.img}
                                showSupport={activePilot.owner !== address}
                                sx={{
                                    width: "64px !important",
                                    height: "64px !important",
                                    marginRight: "12px",
                                }}
                            ></MyPilot>

                            {activePilot.pilotId > 0 && (
                                <Box>
                                    <Text
                                        sx={{
                                            fontSize: "12px",
                                        }}
                                    >
                                        {activePilot.name}{" "}
                                        {activePilot.pilotId
                                            ? "#" + activePilot.pilotId
                                            : ""}
                                    </Text>
                                    <MMyPilotXp
                                        value={activePilot?.xp}
                                    ></MMyPilotXp>
                                </Box>
                            )}
                        </Box>
                        <Image
                            src={ExchangeIcon}
                            sx={{
                                height: "32px",
                                marginRight: "10px",
                            }}
                        ></Image>

                        <MyPilot
                            nonexistentImg={UnknownPilotIcon}
                            img={selectPilotInfo.img}
                            showSupport={selectPilotInfo.owner !== address}
                            sx={{
                                width: "64px !important",
                                height: "64px !important",
                                marginRight: "0.5208vw",
                            }}
                        ></MyPilot>
                    </Box>

                    <Box
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        <MSelectPilotCollections
                            totalSupplys={totalSupplys}
                            currentCollection={currentCollection}
                            inputPilotId={inputPilotId}
                            handleInputPilotId={handleInputPilotId}
                            handlePilotIndex={handlePilotIndex}
                            handleSelectPilotId={handleSelectPilotId}
                        ></MSelectPilotCollections>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "12px",
                        right: "0px",
                    }}
                >
                    <CustomButton
                        isDisabled={inputPilotId.length === 0}
                        variant="unstyled"
                        onClick={handleSearchTokenId}
                        sx={{
                            marginRight: "24px",
                            width: "80px !important",
                            height: "32px !important",
                            fontSize: "12px !important",
                            borderRadius: "8px !important",
                        }}
                    >
                        Preview
                    </CustomButton>
                    <CustomButton
                        isDisabled={selectPilotInfo.pilotId === 0}
                        variant="unstyled"
                        onClick={handleSetActive}
                        sx={{
                            width: "80px !important",
                            height: "32px !important",
                            fontSize: "12px !important",
                            borderRadius: "8px !important",
                        }}
                    >
                        Set Active
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
};

export default MCurrentPilot;
