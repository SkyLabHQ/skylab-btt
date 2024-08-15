import { Box, Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import TutorialIcon from "@/components/BttComponents/assets/tutorial-icon.svg";
import KeyBoard from "../BttComponents/KeyBoard";
import QuitIcon from "@/components/BttComponents/assets/quit.png";
import { ToolShare } from "../BttComponents/ToolShare";
import BidTacToeTutorial from "./BidTacToeTutorial";
import Click1Wav from "@/assets/click1.wav";
import { useUserInfo } from "@/contexts/UserInfo";
import SkinIcon from "@/components/BttComponents/assets/skin.png";
import { useBidIconContext } from "@/contexts/BidIcon";
const audio = new Audio(Click1Wav);
const ToolBar = ({
    showLive = true,
    inviteLink,
    handleShareTw,
    quitType,
    onQuitClick,
}: {
    showLive?: boolean;
    inviteLink?: string;
    handleShareTw?: () => void;
    quitType?: "wait" | "game";
    onQuitClick: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { handleToggleType } = useBidIconContext();

    const {
        isOpen: keyBoardOpen,
        onToggle: keyBoardOnToggle,
        onClose: keyBoardOnClose,
    } = useDisclosure();

    const {
        isOpen: shareOpen,
        onToggle: shareOnToggle,
        onClose: shareOnClose,
    } = useDisclosure({
        defaultIsOpen: true,
    });

    return (
        <Box
            sx={{
                position: "fixed",
                right: "3.125vw ",
                top: "1.4063vw",
                display: "flex",
                alignItems: "center",
                "& > div": {
                    cursor: "pointer",
                },
                zIndex: 100,
                gap: isPc ? "16px" : "8px",
            }}
        >
            <Image
                onClick={handleToggleType}
                src={SkinIcon}
                sx={{
                    height: isPc ? "48px" : "40px",
                    width: isPc ? "48px" : "40px",
                    cursor: "pointer",
                }}
            ></Image>
            {isPc && (
                <KeyBoard
                    onToggle={() => {
                        audio.play();
                        keyBoardOnToggle();
                        quitType === "game" && shareOnClose();
                    }}
                    onClose={keyBoardOnClose}
                ></KeyBoard>
            )}

            {quitType === "game" && (
                <ToolShare
                    showLive={showLive}
                    inviteLink={inviteLink}
                    handleShareTw={handleShareTw}
                    isOpen={shareOpen}
                    onToggle={() => {
                        audio.play();
                        shareOnToggle();
                        keyBoardOnClose();
                    }}
                    onClose={shareOnClose}
                ></ToolShare>
            )}
            <BidTacToeTutorial>
                <Image
                    src={TutorialIcon}
                    sx={{
                        height: isPc ? "48px" : "40px",
                        width: isPc ? "48px" : "40px",
                    }}
                ></Image>
            </BidTacToeTutorial>
            <Image
                onClick={() => {
                    audio.play();
                    onQuitClick();
                }}
                src={QuitIcon}
                sx={{
                    height: isPc ? "48px" : "40px",
                    width: isPc ? "48px" : "40px",
                    cursor: "pointer",
                }}
            ></Image>
        </Box>
    );
};

export default ToolBar;
