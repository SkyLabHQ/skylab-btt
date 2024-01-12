import React from "react";
import {
    Box,
    Button,
    Flex,
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
import RightArrow from "./assets/arrow-right.svg";

const ShareButtons = ({
    showShareEmoji,
    handleShareEmoji,
    handleShare,
    handleBackToPrivateLobby,
}: {
    showShareEmoji?: boolean;
    handleShareEmoji?: () => void;
    handleShare: () => void;
    handleBackToPrivateLobby?: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <SimpleGrid
            columns={4}
            spacingX={"12px"}
            sx={{
                marginTop: "20px",
                position: "relative",
                width: "100%",

                "& button": {
                    width: isPc ? "9.375vw" : "80px",
                    height: isPc ? "2.7083vw" : "32px",
                    borderRadius: isPc ? "0.9375vw" : "10px",
                    fontSize: isPc ? "1.0417vw" : "12px",
                    border: isPc
                        ? "3px solid #fff !important"
                        : "2px solid #fff !important",
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
                        {isPc && (
                            <Text
                                sx={{
                                    flex: 1,
                                    textAlign: "center",
                                }}
                            >
                                Share Emoji
                            </Text>
                        )}
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
                        width: isPc ? "1.5625vw" : "16px",
                    }}
                ></Image>
                {isPc && (
                    <Text
                        sx={{
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        Save Image
                    </Text>
                )}
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
                {isPc && (
                    <Text
                        sx={{
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        Share Replay{" "}
                    </Text>
                )}
            </Button>
            <Flex
                onClick={handleBackToPrivateLobby}
                sx={{
                    width: "80px",
                    justifyContent: "flex-end",
                }}
            >
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "12px",
                        textDecorationLine: "underline",
                        marginRight: "0.4167vw",
                        width: "48px",
                        textAlign: "center",
                    }}
                >
                    Back to Lobby
                </Text>
                <Image
                    src={RightArrow}
                    sx={{
                        width: isPc ? "1.25vw" : "12px",
                    }}
                ></Image>
            </Flex>
        </SimpleGrid>
    );
};

export default ShareButtons;
