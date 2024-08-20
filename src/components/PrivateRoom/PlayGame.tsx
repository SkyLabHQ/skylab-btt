import { Box, useDisclosure } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import MLayout from "./MLayout";
import QuitModal from "../BttComponents/QuitModal";

const PlayGame = ({
    bidAmount,
    currentRound,
    gameTimeout,
    loading,
    onBid,
    showAnimateNumber,
    onBidAmount,
    handleQuit,
}: {
    bidAmount: number;
    currentRound: number;
    gameTimeout: number;
    loading: boolean;
    onBid: () => void;
    showAnimateNumber: number;
    onBidAmount: (value: number) => void;
    handleQuit: () => void;
}) => {
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const inviteLink = useMemo(() => {
        return "";
    }, []);

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
    };

    const handleShareTw = () => {};

    return (
        <Box
            style={{
                height: "100%",
            }}
        >
            <MLayout
                currentRound={currentRound}
                gameTimeout={gameTimeout}
                showAnimateNumber={showAnimateNumber}
                bidAmount={bidAmount}
                onInputChange={onBidAmount}
                onConfirm={onBid}
                handleQuitClick={() => {
                    onOpen();
                }}
                loading={loading}
                handleBoardClick={handleBoardClick}
                showAnimateConfirm={showAnimateConfirm}
            ></MLayout>
            <QuitModal
                onConfirm={handleQuit}
                isOpen={isOpen}
                onClose={onClose}
                quitType={"wait"}
            ></QuitModal>
        </Box>
    );
};

export default PlayGame;
