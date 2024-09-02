import {
    Box,
    Image,
    keyframes,
    Text,
    Flex,
    Modal,
    ModalContent,
    useDisclosure,
    ModalOverlay,
} from "@chakra-ui/react";
import { createRef, useEffect, useState } from "react";
import Rule from "@/components/Introduce/Rule";
import IntroduceContent from "@/components/Introduce/IntroduceContent";
import Schedule from "@/components/Introduce/Schedule";
import CVideo from "@/components/Introduce/assets/c.mp4";
import WVideo from "@/components/Introduce/assets/w.mp4";

const Introduce = () => {
    const cRef = createRef<HTMLVideoElement>();
    const wRef = createRef<HTMLVideoElement>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [wMode, setWMode] = useState(false);

    const [mode, setMode] = useState("");

    const handleChangeWMode = () => {
        console.log("进来", wMode);
        if (wMode) {
            if (cRef.current) {
                const currentTime = cRef.current.currentTime;
                wRef.current.currentTime = currentTime;
                cRef.current.play();
                wRef.current?.play();
            }

            setWMode(false);
        } else {
            if (wRef.current) {
                const currentTime = cRef.current.currentTime;
                wRef.current.currentTime = currentTime;
                wRef.current.pause();
                cRef.current?.pause();
            }

            setWMode(true);
        }
    };

    const handleChangeMode = (mode: string) => {
        setMode(mode);

        if (mode) {
            onOpen();
        } else {
            onClose();
        }
    };

    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            console.log(mode, "mode");
            if (mode) {
                return;
            }

            const key = event.key;
            if (event.shiftKey && key === "Enter") {
                handleChangeMode("schedule");
            } else if (event.shiftKey && key === "ArrowUp") {
                handleChangeWMode();
            } else if (key === "Enter") {
                handleChangeMode("rules");
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, [wMode, mode]);

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
                position: "relative",
                background: "#1b1b1b",
            }}
        >
            <video
                autoPlay
                loop
                muted
                style={{
                    width: "100%",
                    left: 0,
                    top: 0,
                    objectFit: "cover",
                    position: "absolute",
                    opacity: wMode ? 0 : 1,
                    mixBlendMode: "screen",
                }}
                ref={cRef}
            >
                <source src={CVideo} type="video/mp4" />
            </video>
            <video
                autoPlay
                loop
                muted
                style={{
                    width: "100%",
                    left: 0,
                    top: 0,
                    objectFit: "cover",
                    position: "absolute",
                    opacity: wMode ? 1 : 0,
                    mixBlendMode: "screen",
                }}
                ref={wRef}
            >
                <source src={WVideo} type="video/mp4" />
            </video>

            <IntroduceContent
                wMode={wMode}
                onModeChange={(mode: string) => {
                    handleChangeMode(mode);
                }}
                onThemeChange={handleChangeWMode}
            ></IntroduceContent>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={"full"}
                autoFocus={false}
            >
                <ModalOverlay
                    bg="rgba(0, 0, 0, 0.8)"
                    sx={{
                        backdropFilter: "blur(10px)",
                    }}
                />
                <ModalContent
                    sx={{
                        background: "transparent",
                        overflow: "auto",
                        padding: "100px 20px 100px",
                        fontFamily: "Orbitron",
                    }}
                >
                    {mode === "rules" && (
                        <Rule
                            onModeChange={(mode: string) => {
                                handleChangeMode(mode);
                            }}
                        ></Rule>
                    )}
                    {mode === "schedule" && (
                        <Schedule
                            onModeChange={(mode: string) => {
                                handleChangeMode(mode);
                            }}
                        ></Schedule>
                    )}
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Introduce;
