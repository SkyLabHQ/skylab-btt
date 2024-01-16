import { Box, Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import TutorialIcon from "@/components/BttComponents/assets/tutorial-icon.svg";
import KeyBoard from "../BttComponents/KeyBoard";
import QuitIcon from "@/components/BttComponents/assets/quit.svg";
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
            }}
        >
            <KeyBoard
                type={false}
                isOpen={keyBoardOpen}
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
                    onToggle={shareOnToggle}
                    onClose={shareOnClose}
                ></ToolShare>
            )}
            <BidTacToeTutorial>
                <Image
                    src={TutorialIcon}
                    sx={{
                        height: isPc ? "2.3958vw" : "32px",
                        width: isPc ? "2.3958vw" : "32px",
                        marginRight: "0.7292vw",
                    }}
                ></Image>
            </BidTacToeTutorial>
            <Image
                onClick={onQuitClick}
                src={QuitIcon}
                sx={{
                    height: isPc ? "2.3958vw" : "32px",
                    width: isPc ? "2.3958vw" : "32px",
                    cursor: "pointer",
                }}
            ></Image>
        </Box>
    );
};

export default ToolBar;
