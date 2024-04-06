import { Box, Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import TutorialIcon from "@/components/BttComponents/assets/tutorial-icon.svg";
import KeyBoard from "../BttComponents/KeyBoard";
import QuitIcon from "@/components/BttComponents/assets/quit.png";
import { ToolShare } from "../BttComponents/ToolShare";
import BidTacToeTutorial from "../TacToe/BidTacToeTutorial";

const ToolBar = ({
    inviteLink,
    handleShareTw,
    quitType,
    onQuitClick,
}: {
    inviteLink?: string;
    handleShareTw?: () => void;
    quitType?: "wait" | "game";
    onQuitClick: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

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
                gap: isPc ? "16px" : "12px",
            }}
        >
            <KeyBoard
                onToggle={() => {
                    keyBoardOnToggle();
                    quitType === "game" && shareOnClose();
                }}
                onClose={keyBoardOnClose}
            ></KeyBoard>

            {quitType === "game" && (
                <ToolShare
                    inviteLink={inviteLink}
                    handleShareTw={handleShareTw}
                    isOpen={shareOpen}
                    onToggle={() => {
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
                onClick={onQuitClick}
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
