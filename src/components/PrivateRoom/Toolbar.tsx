import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import TutorialIcon from "./assets/tutorial-icon.svg";
import QuitModal from "./QuitModal";
import KeyBoard from "../BttComponents/KeyBoard";
import BidTacToeTutorial from "../TacToe/BidTacToeTutorial";

const ToolBar = ({ quitType }: { quitType?: "wait" | "game" }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: keyBoardOpen,
        onToggle: keyBoardOnToggle,
        onClose: keyBoardOnClose,
    } = useDisclosure();

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
                }}
                onClose={keyBoardOnClose}
            ></KeyBoard>
            <Box
                sx={{
                    borderRadius: "0.5208vw",
                    height: "2.3958vw",
                    width: "2.3958vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                    marginRight: "0.7292vw",
                }}
            >
                <BidTacToeTutorial>
                    <Image
                        src={TutorialIcon}
                        sx={{
                            width: "1.5625vw",
                            height: "1.5625vw",
                        }}
                    ></Image>
                </BidTacToeTutorial>
            </Box>
            <Box
                onClick={onOpen}
                sx={{
                    borderRadius: "0.5208vw",
                    height: "2.3958vw",
                    width: "2.3958vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                }}
            >
                <Text sx={{ fontSize: "0.8333vw" }}>Quit</Text>
            </Box>
            <QuitModal
                isOpen={isOpen}
                onClose={onClose}
                quitType={quitType}
            ></QuitModal>
        </Box>
    );
};

export default ToolBar;
