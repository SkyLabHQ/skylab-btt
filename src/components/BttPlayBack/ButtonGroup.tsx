import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import SaveIcon from "@/components/TacToe/assets/save-icon.svg";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import RightArrowWhite from "./assets/right-arrow.svg";
import { shortenAddressWithout0x } from "@/utils";
import ShareEmojiIcon from "./assets/share-emoji.svg";
import { useChainId } from "wagmi";
import {
    BoardItem,
    GameInfo,
    getShareEmoji,
    getWinState,
} from "@/skyConstants/bttGameTypes";
import { Info } from "@/pages/TacToe";
import PlayBackButton from "./PlayBackButton";

const ButtonGroup = ({
    showPre,
    showNext,
    showShareEmoji,
    list,
    myGameInfo,
    myInfo,
    bttGameAddress,
    currentRound,
    handleStartStep,
    handlePreStep,
    handleNextStep,
    handleEndStep,
    handleNext,
}: {
    showPre: boolean;
    showNext: boolean;
    showShareEmoji: boolean;
    list: BoardItem[];
    myInfo: Info;
    myGameInfo: GameInfo;
    bttGameAddress: string;
    currentRound: number;
    startPlay: boolean;
    handleStartStep: () => void;
    handlePreStep: () => void;
    handleStartPlay: () => void;
    handleNextStep: () => void;
    handleEndStep: () => void;
    handleNext?: () => void;
}) => {
    const chainId = useChainId();
    const handleShare = () => {
        const url = `${
            window.location.origin
        }/btt/playback?gameAddress=${bttGameAddress}&show=true&round=${currentRound}&burner=${shortenAddressWithout0x(
            myInfo.burner,
        )}&chainId=${chainId}`;
        const text = `Bid Tac Toe is a fully on-chain cryptoeconomic game, on @base. You one-shot blind bid to conquer grids to connect a line. It's a contest of deduction and psychology. 

Watch my replay here!

${url}  
        
@skylabHQ 
https://app.projmercury.io/btt`;

        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        );
    };
    const handleShareEmoji = () => {
        const text = getShareEmoji(
            myInfo.mark,
            list,
            getWinState(myGameInfo.gameState),
        );

        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        );
    };
    return (
        <Box>
            <PlayBackButton
                showPre={showPre}
                showNext={showNext}
                handleEndStep={handleEndStep}
                handleNextStep={handleNextStep}
                handlePreStep={handlePreStep}
                handleStartStep={handleStartStep}
            ></PlayBackButton>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1.0417vw",
                    position: "relative",
                }}
            >
                {showShareEmoji && (
                    <Button
                        sx={{
                            border: "1px solid rgba(97, 97, 97, 1) !important",
                            borderRadius: "0.9375vw",
                            width: "9.375vw",
                            height: "2.7083vw",
                            color: "#d9d9d9",
                            fontSize: "1.0417vw",
                            position: "absolute",
                            left: "-10.4167vw",
                            top: "50%",
                            transform: "translateY(-50%)",
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
                {handleNext && (
                    <Button
                        variant={"ghost"}
                        sx={{
                            position: "absolute",
                            right: "-7.2083vw",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        onClick={() => {
                            handleNext();
                        }}
                    >
                        <Text
                            sx={{
                                textDecoration: "underline",
                                fontSize: "1.25vw",
                                marginRight: "0.2604vw",
                            }}
                        >
                            Next
                        </Text>
                        <Image
                            src={RightArrowWhite}
                            sx={{
                                width: "1.0417vw",
                            }}
                        ></Image>
                    </Button>
                )}
            </Box>
        </Box>
    );
};
export default ButtonGroup;
