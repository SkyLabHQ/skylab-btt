import React from "react";
import {
    Box,
    Button,
    Image,
    SimpleGrid,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <SimpleGrid
            columns={isPc ? 3 : 2}
            sx={{
                marginTop: "1.0417vw",
                position: "relative",
                "& button": {
                    width: isPc ? "9.375vw" : "98px",
                    height: isPc ? "2.7083vw" : "32px",
                    borderRadius: isPc ? "0.9375vw" : "10px",
                    fontSize: isPc ? "1.0417vw" : "12px",
                    border: isPc
                        ? "3px solid #bcbbbe !important"
                        : "2px solid #bcbbbe !important",
                    color: "#d9d9d9",
                },
            }}
        >
            <Box>
                {showShareEmoji && (
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            handleShareEmoji();
                        }}
                    >
                        <Image
                            src={ShareEmojiIcon}
                            sx={{
                                width: isPc ? "1.5625vw" : "16px",
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
                    sx={{
                        marginRight: "5px",
                        width: isPc ? "1.5625vw" : "16px",
                    }}
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
                variant={"outline"}
                onClick={() => {
                    handleShare();
                }}
            >
                <Image
                    src={TwLogo}
                    sx={{
                        width: isPc ? "1.5625vw" : "16px",
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
        </SimpleGrid>
    );
};

export default ShareButtons;
