import { Box, useDisclosure } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { usePvpGameContext } from "@/pages/PvpRoom";
import MLayout from "./MLayout";
import QuitModal from "../BttComponents/QuitModal";

const PlayGame = ({
    currentRound,
    gameTimeout,
    loading,
    onBid,
    showAnimateNumber,
}: {
    currentRound: number;
    gameTimeout: number;
    loading: boolean;
    onBid: (amount: number) => void;
    showAnimateNumber: number;
}) => {
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false);
    const toast = useSkyToast();
    const { myGameInfo } = usePvpGameContext();
    const [bidAmount, setBidAmount] = useState<number>(0);

    const inviteLink = useMemo(() => {
        return "";
    }, []);

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
    };

    const handleBidAmount = (value: number) => {
        if (loading) return;
        if (myGameInfo.isBid) return;

        if (value < 0) return;
        if (value > myGameInfo.balance) return;
        setBidAmount(value);
    };

    const handleQuit = async () => {
        if (surrenderLoading) {
            return;
        }
        try {
            setSurrenderLoading(true);
            // await  surrender()
            setSurrenderLoading(false);
        } catch (e) {
            setSurrenderLoading(false);
            console.log(e);
            toast(handleError(e, true));
        }
    };

    const handleShareTw = () => {};

    console.log(loading, "loadingloadingloadingloadingloadingloadingloading");

    return (
        <Box
            style={{
                height: "100%",
            }}
        >
            <MLayout
                currentRound={currentRound}
                inviteLink={inviteLink}
                handleShareTw={handleShareTw}
                gameTimeout={gameTimeout}
                showAnimateNumber={showAnimateNumber}
                bidAmount={bidAmount}
                onInputChange={handleBidAmount}
                onConfirm={() => {
                    onBid(Number(bidAmount));
                }}
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
