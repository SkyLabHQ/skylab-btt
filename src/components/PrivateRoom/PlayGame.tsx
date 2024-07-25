import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Board from "@/components/BttComponents/Board";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { PvpGameInfo, usePvpGameContext } from "@/pages/PvpRoom";
import { CHAIN_NAMES, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import UserProfile from "./UserProfile";
import {
    PvpGameStatus,
    getWinState,
    UserMarkType,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import MLayout from "./MLayout";
import QuitModal from "../BttComponents/QuitModal";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import StatusProgress from "../BttComponents/StatusProgress";
import { shortenAddressWithout0x } from "@/utils";
import { MINI_APP_URL } from "@/skyConstants/tgConfig";
import { bid, getGameInfo } from "@/api/pvpGame";
import { useInitData } from "@tma.js/sdk-react";

const PlayGame = ({
    onBid,
    nextDrawWinner,
    showAnimateNumber,
    gameState,
    currentGrid,
}: {
    onBid: (amount: number) => void;
    nextDrawWinner: string;
    showAnimateNumber: number;
    gameState: PvpGameStatus;
    currentGrid: number;
}) => {
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false);
    const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false);
    const toast = useSkyToast();
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);
    const { myGameInfo, opGameInfo, gameId, onList, list } =
        usePvpGameContext();

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

    return (
        <Box
            style={{
                height: "100%",
            }}
        >
            <MLayout
                gameState={gameState}
                inviteLink={inviteLink}
                handleShareTw={handleShareTw}
                nextDrawWinner={nextDrawWinner}
                autoCommitTimeoutTime={autoCommitTimeoutTime}
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
