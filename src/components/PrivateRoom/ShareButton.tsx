import {
    Box,
    Button,
    Flex,
    Image,
    SimpleGrid,
    Text,
    useClipboard,
} from "@chakra-ui/react";
import InviteIcon from "@/components/TacToe/assets/invite-icon.svg";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import RightArrow from "./assets/arrow-right.svg";
import useSkyToast from "@/hooks/useSkyToast";

const inviteFriends = `
${window.location.origin}

Btt is a fully on-chain cryptoeconomic game of deduction and psychology 
`;

const ShareButtons = ({
    text = "Back to 1v1",
    handleShare,
    handleTextClick,
    showText = true,
}: {
    text?: string;
    handleShare: () => void;
    handleTextClick?: () => void;
    showText?: boolean;
}) => {
    const toast = useSkyToast();
    const { onCopy } = useClipboard(inviteFriends);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                marginTop: "20px",
            }}
        >
            <SimpleGrid
                columns={3}
                spacingX={"9px"}
                sx={{
                    margin: "0 auto",
                    position: "relative",
                    width: "fit-content",
                    "& button": {
                        width: "120px",
                        height: "32px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        border: "2px solid #fff !important",
                        color: "#d9d9d9",
                    },
                }}
            >
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
                                width: "16px",
                            }}
                        ></Image>
                    </Button>
                </Flex>
                <Flex justify={"center"}>
                    <Button
                        variant={"outline"}
                        onClick={async (e) => {
                            onCopy();
                            toast("Copy link success!");
                        }}
                    >
                        <Image
                            src={InviteIcon}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Button>
                </Flex>

                {showText && (
                    <Flex
                        justify={"center"}
                        sx={{
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <Flex
                            onClick={handleTextClick}
                            sx={{
                                // width: isPc ? "200px" : "80px",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: "12px",
                                    textDecorationLine: "underline",
                                    maxWidth: "54px",
                                    textAlign: "center",
                                }}
                            >
                                {text}
                            </Text>
                            <Image
                                src={RightArrow}
                                sx={{
                                    width: "12px",
                                }}
                            ></Image>
                        </Flex>
                    </Flex>
                )}
            </SimpleGrid>
        </Box>
    );
};

export default ShareButtons;
