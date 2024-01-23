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
    text = "Back to Lobby",
    handleShare,
    handleTextClick,
    showText = true,
}: {
    text?: string;
    handleShare: () => void;
    handleTextClick?: () => void;
    showText?: boolean;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <SimpleGrid
            columns={showText ? 3 : 2}
            spacingX={"12px"}
            sx={{
                marginTop: "20px",
                position: "relative",
                width: "100%",
                "& button": {
                    width: isPc ? "12vw" : "120px",
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
            <Flex justify={"center"}>
                <Button
                    variant={"outline"}
                    onClick={async (e) => {
                        e.stopPropagation();
                        const content =
                            document.getElementById("share-content");
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
            </Flex>
            <Flex justify={"center"}>
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
            </Flex>
            {showText && (
                <Flex justify={"center"}>
                    <Flex
                        onClick={handleTextClick}
                        sx={{
                            // width: isPc ? "200px" : "80px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: isPc ? "1.25vw" : "12px",
                                textDecorationLine: "underline",
                                maxWidth: isPc ? "150px" : "48px",
                                textAlign: "center",
                            }}
                        >
                            {text}
                        </Text>
                        <Image
                            src={RightArrow}
                            sx={{
                                width: isPc ? "1.25vw" : "12px",
                            }}
                        ></Image>
                    </Flex>
                </Flex>
            )}
        </SimpleGrid>
    );
};

export default ShareButtons;
