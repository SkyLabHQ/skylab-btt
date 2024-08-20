import {
    Box,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useClipboard,
} from "@chakra-ui/react";
import ShareIcon from "./assets/share.png";
import LinkIcon from "./assets/link.svg";
import TwIcon from "./assets/tw.svg";
import useSkyToast from "@/hooks/useSkyToast";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

export const ToolShare = ({
    showLive = true,
    inviteLink,
    isOpen,
    onToggle,
    onClose,
    handleShareTw,
}: {
    showLive?: boolean;
    inviteLink: string;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    handleShareTw?: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const { onCopy } = useClipboard(inviteLink);
    const handleCopyLink = () => {
        onCopy();
        toast("Link copied");
    };

    return (
        <Popover
            closeOnBlur={false}
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Image
                    onClick={() => {
                        onToggle();
                    }}
                    src={ShareIcon}
                    sx={{
                        height: isPc ? "48px" : "40px",
                        width: isPc ? "48px" : "40px",
                        cursor: "pointer",
                    }}
                ></Image>
            </PopoverTrigger>
            <PopoverContent
                sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    width: "auto",
                    padding: "0px",
                    "& .chakra-popover__arrow": {
                        background: "#fff !important",
                    },
                    "&:focus": {
                        outline: "none !important",
                        boxShadow: "none !important",
                    },
                }}
            >
                <PopoverArrow />
                <PopoverBody
                    sx={{
                        padding: "0.4167vw 0.625vw",
                    }}
                >
                    <Box>
                        {showLive && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={handleCopyLink}
                            >
                                <Image
                                    src={LinkIcon}
                                    sx={{
                                        marginRight: "4px",
                                        width: isPc ? "0.8333vw" : "12px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "0.8333vw" : "12px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Live game invite link
                                </Text>
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                            onClick={handleShareTw}
                        >
                            <Image
                                src={TwIcon}
                                sx={{
                                    marginRight: "4px",
                                    width: isPc ? "0.8333vw" : "12px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: isPc ? "0.8333vw" : "12px",
                                    fontWeight: "bold",
                                }}
                            >
                                Share Link to Twitter{" "}
                            </Text>
                        </Box>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
