import {
    Box,
    Button,
    Flex,
    Image,
    SimpleGrid,
    Text,
    useClipboard,
    useMediaQuery,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import SaveIcon from "@/components/TacToe/assets/save-icon.svg";
import InviteIcon from "@/components/TacToe/assets/invite-icon.svg";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import RightArrow from "./assets/arrow-right.svg";
import useSkyToast from "@/hooks/useSkyToast";

const downloadFile = (href: any, fileName = "result") => {
    const downloadElement = document.createElement("a");
    downloadElement.href = href;
    downloadElement.download = `${fileName}.png`;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
};

const inviteFriends = `
${window.location.origin}

Btt is a fully on-chain cryptoeconomic game of deduction and psychology 
`;

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
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                        width: isPc ? "12vw" : "120px",
                        height: isPc ? "2.7083vw" : "32px",
                        borderRadius: isPc ? "0.9375vw" : "10px",
                        fontSize: isPc ? "1.0417vw" : "12px",
                        border: "2px solid #fff !important",
                        color: "#d9d9d9",
                    },
                }}
            >
                {isPc && (
                    <Flex justify={"center"}>
                        <Button
                            variant={"outline"}
                            onClick={async (e) => {
                                e.stopPropagation();
                                const graphImg =
                                    document.getElementById("share-content");
                                // 创建canvas元素
                                const canvasdom =
                                    document.createElement("canvas");

                                // 获取dom宽高
                                const w = parseInt(
                                    window.getComputedStyle(graphImg).width,
                                    10,
                                );
                                const h = parseInt(
                                    window.getComputedStyle(graphImg).height,
                                    10,
                                );

                                // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
                                const scaleBy = 2; //也可以用window.devicePixelRatio，
                                canvasdom.width = w * scaleBy;
                                canvasdom.height = h * scaleBy;

                                //scale:2 按比例增加分辨率，将绘制内容放大对应比例
                                const canvas = await html2canvas(graphImg, {
                                    canvas: canvasdom,
                                    scale: scaleBy,
                                    useCORS: true,
                                });

                                //将canvas转为base64
                                const url = canvas.toDataURL();

                                //配置下载的文件名
                                const fileName = `game-result`;
                                downloadFile(url, fileName);
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
                )}
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
                                Share{" "}
                            </Text>
                        )}
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
                                Invite Freinds{" "}
                            </Text>
                        )}
                    </Button>
                </Flex>

                {showText && !isPc && (
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
            {showText && isPc && (
                <Flex
                    justify={"center"}
                    sx={{
                        position: "absolute",
                        right: "50px",
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
                                fontSize: "1.25vw",
                                textDecorationLine: "underline",
                                maxWidth: "150px",
                                textAlign: "center",
                            }}
                        >
                            {text}
                        </Text>
                        <Image
                            src={RightArrow}
                            sx={{
                                width: "1.25vw",
                            }}
                        ></Image>
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};

export default ShareButtons;
