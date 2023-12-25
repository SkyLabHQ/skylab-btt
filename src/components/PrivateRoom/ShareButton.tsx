import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import SaveIcon from "@/components/TacToe/assets/save-icon.svg";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import ShareEmojiIcon from "./assets/share-emoji.svg";

const ShareButtons = ({
    showShareEmoji,
    handleShareEmoji,
    handleShare,
}: {
    showShareEmoji?: boolean;
    handleShareEmoji?: () => void;
    handleShare: () => void;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.0417vw",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "9.375vw",
                    height: "2.7083vw",
                    marginRight: "0.625vw",
                }}
            >
                {showShareEmoji && (
                    <Button
                        sx={{
                            border: "3px solid #bcbbbe !important",
                            borderRadius: "0.9375vw",
                            width: "9.375vw",
                            height: "2.7083vw",
                            color: "#d9d9d9",
                            fontSize: "1.0417vw",
                        }}
                        variant={"outline"}
                        onClick={() => {
                            handleShareEmoji();
                        }}
                    >
                        <Image
                            src={ShareEmojiIcon}
                            sx={{
                                width: "1.5625vw",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                flex: 1,
                                textAlign: "center",
                            }}
                        >
                            Share Emoji
                        </Text>
                    </Button>
                )}
            </Box>

            <Button
                sx={{
                    border: "3px solid #bcbbbe !important",
                    borderRadius: "0.9375vw",
                    width: "9.375vw",
                    height: "2.7083vw",
                    color: "#d9d9d9",
                    fontSize: "1.0417vw",
                    marginRight: "0.625vw",
                }}
                variant={"outline"}
                onClick={async (e) => {
                    e.stopPropagation();
                    const content = document.getElementById("share-content");
                    const canvas = await html2canvas(content);
                    canvas.toBlob((blob: any) => {
                        if (!blob) {
                            return;
                        }
                        saveAs(blob, "result.jpg");
                    });
                }}
            >
                <Image
                    src={SaveIcon}
                    sx={{ marginRight: "5px", width: "1.5625vw" }}
                ></Image>
                <Text
                    sx={{
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    Save Image
                </Text>
            </Button>
            <Button
                sx={{
                    border: "3px solid #bcbbbe !important",
                    borderRadius: "0.9375vw",
                    width: "9.375vw",
                    height: "2.7083vw",
                    color: "#d9d9d9",
                    fontSize: "1.0417vw",
                }}
                variant={"outline"}
                onClick={() => {
                    handleShare();
                }}
            >
                <Image
                    src={TwLogo}
                    sx={{
                        width: "1.5625vw",
                    }}
                ></Image>
                <Text
                    sx={{
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    Share Replay{" "}
                </Text>
            </Button>
        </Box>
    );
};

export default ShareButtons;
