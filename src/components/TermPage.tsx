import { Box, Flex, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import MouseImage from "@/assets/mouse.png";
import MouseAImage from "@/assets/mouse-a.png";
import MouseBImage from "@/assets/mouse-b.png";
import Bg from "@/assets/bg.png";
import YesIcon from "@/assets/yes.svg";

const TermPage = ({ onContinue }: { onContinue: () => void }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [confirm, setConfirm] = useState(false);
    const [_, setUpdate] = useState(0);
    const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
    const mounseX = useRef(0);
    const mounseY = useRef(0);
    const mouseImg = useRef(MouseBImage);

    const handleOpenPdf = () => {
        localStorage.setItem("term", "true");
        setConfirm(true);
        window.open(
            "https://docs.google.com/document/d/1Tq04jfFTmyVzwto8BYtlBh9U9iZ7_Lsp4muaKudnQAA/edit#heading=h.dbtsmhujsl04",
            "_blank",
        );
    };

    // 处理鼠标移动
    const handleMouseMove = (event: any) => {
        const { clientX, clientY } = event;
        mounseX.current = clientX;
        mounseY.current = clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 计算背景位置的百分比
        const backgroundPositionX =
            50 + ((clientX - screenWidth / 2) / screenWidth) * 20; // 微调这个值来改变移动的幅度
        const backgroundPositionY =
            50 + ((clientY - screenHeight / 2) / screenHeight) * 20; // 微调这个值来改变移动的幅度
        setBackgroundPosition(
            `${backgroundPositionX}% ${backgroundPositionY}%`,
        );
    };

    // 处理鼠标移动
    const handleMouseDown = () => {
        mouseImg.current = MouseAImage;
        setUpdate((prev) => prev + 1);
    };

    // 处理鼠标移动
    const handleMouseUp = () => {
        mouseImg.current = MouseImage;
        setUpdate((prev) => prev + 1);
    };

    useEffect(() => {
        let animationFrameId: any = null;
        const throttledHandleMouseMove = (event: any) => {
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = window.requestAnimationFrame(() =>
                handleMouseMove(event),
            );
        };
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", throttledHandleMouseMove);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", throttledHandleMouseMove);
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);
    return (
        <Flex
            sx={{
                width: "100%",
                minHeight: "100%",
                position: "relative",
                backgroundImage: `url(${Bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 100%",
                backgroundColor: "#1b1b1b",
                backgroundPosition: `${backgroundPosition}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                // cursor: `none`,
                padding: "0 32px",
            }}
            onClick={() => {
                onContinue();
            }}
        >
            {" "}
            {isPc && (
                <Image
                    src={mouseImg.current}
                    sx={{
                        position: "absolute",
                        left: "-30px",
                        top: "-30px",
                        width: "60px",
                        height: "60px",
                        transform: `translate3d(${mounseX.current}px, ${mounseY.current}px, 0)`,
                        pointerEvents: "none",
                        zIndex: 999999,
                    }}
                ></Image>
            )}
            <Flex
                align={"center"}
                sx={{
                    position: "relative",
                    marginTop: "-50px",
                }}
            >
                <Flex
                    sx={{
                        width: "31px",
                        height: "31px",
                        flexShrink: 0,
                        borderRadius: "6px",
                        border: "2px solid #FFF",
                        marginRight: "20px",
                        cursor: "pointer",
                    }}
                    align={"center"}
                    justify={"center"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm) {
                            localStorage.setItem("term", "false");
                        } else {
                            localStorage.setItem("term", "true");
                        }
                        setConfirm(!confirm);
                    }}
                >
                    {confirm && <Image src={YesIcon}></Image>}
                </Flex>
                <Text
                    sx={{
                        maxWidth: "1000px",
                    }}
                >
                    By checking this box, you indicate your acceptance and
                    agreement to be bound by our{" "}
                    <span
                        style={{
                            fontWeight: "bold",
                            color: "#FDDC2D",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                        }}
                        onClick={handleOpenPdf}
                    >
                        terms of service
                    </span>{" "}
                    , including any updates or revisions thereto, and
                    acknowledge that you have read and understand our privacy
                    policy.
                </Text>
                {confirm && (
                    <Text
                        sx={{
                            fontSize: "20px",
                            marginTop: "90px",
                            position: "absolute",
                            bottom: "-100px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Press any key to continue
                    </Text>
                )}
            </Flex>
        </Flex>
    );
};

export default TermPage;
