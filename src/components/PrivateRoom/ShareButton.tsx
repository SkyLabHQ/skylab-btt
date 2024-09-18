import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import RightArrow from "./assets/arrow-right.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const ShareButtons = ({
    text = "Back to 1v1",
    handleShare,
    handleTextClick,
}: {
    text?: string;
    handleShare: () => void;
    handleTextClick?: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                marginTop: "20px",
            }}
        >
            <Flex
                sx={{
                    margin: "0 auto",
                    width: "100%",
                    position: "relative",
                    gap: "20px",
                    "& button": {
                        width: isPc ? "206px" : "100px",
                        height: isPc ? "65px" : "32px",
                        borderRadius: isPc ? "20px" : "10px",
                        fontSize: isPc ? "24px" : "12px",
                        border: isPc
                            ? "2px solid #fff !important"
                            : "1px solid #fff !important",
                        color: "#d9d9d9",
                        fontWeight: 400,
                    },
                    "& img": {
                        width: isPc ? "26px" : "13px",
                    },
                }}
                justify={"center"}
            >
                <Button
                    variant={"outline"}
                    onClick={() => {
                        handleShare();
                    }}
                >
                    <Image src={TwLogo}></Image>
                    <Text sx={{}}>Share Replay</Text>
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => {
                        handleTextClick();
                    }}
                >
                    <Text
                        sx={{
                            marginRight: "10px",
                        }}
                    >
                        Next
                    </Text>
                    <Image src={RightArrow}></Image>
                </Button>
            </Flex>
        </Box>
    );
};

export default ShareButtons;
