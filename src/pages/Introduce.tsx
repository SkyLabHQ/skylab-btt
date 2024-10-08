import {
    Box,
    Modal,
    ModalContent,
    useDisclosure,
    ModalOverlay,
} from "@chakra-ui/react";
import { createRef, useEffect, useState } from "react";
import Rule from "@/components/Introduce/Rule";
import IntroduceContent from "@/components/Introduce/IntroduceContent";
import Schedule from "@/components/Introduce/Schedule";
import Play from "@/components/Introduce/Play";
import CVideo from "@/components/Introduce/assets/c.mp4";
import WVideo from "@/components/Introduce/assets/w.mp4";
import Lock from "@/components/Introduce/Lock";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import BgMp3 from "@/components/Introduce/assets/bg.mp3";
import TournamentHelmet from "@/components/Helmet/Tournament";
const bgAudio = new Audio(BgMp3);

const Introduce = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const [init, setInit] = useState(false);
    const cRef = createRef<HTMLVideoElement>();
    const wRef = createRef<HTMLVideoElement>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [wMode, setWMode] = useState(false);

    const [mode, setMode] = useState("");

    const handleChangeWMode = () => {
        if (wMode) {
            if (wRef.current) {
                const currentTime = cRef.current.currentTime;
                wRef.current.currentTime = currentTime;
                wRef.current.pause();
                cRef.current?.pause();
            }
            setWMode(false);
        } else {
            if (cRef.current) {
                const currentTime = wRef.current.currentTime;
                wRef.current.currentTime = currentTime;
                cRef.current.play();
                wRef.current?.play();
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
        if (mode || !init) {
            return;
        }
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            console.log(key, "key");
            if (event.shiftKey && key === "Enter") {
                handleChangeMode("schedule");
            } else if (event.shiftKey && key === "?") {
                handleChangeWMode();
            } else if (key === "Enter") {
                handleChangeMode("play");
            } else if (key === " ") {
                event.preventDefault();
                handleChangeMode("rules");
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, [wMode, mode, init]);

    useEffect(() => {
        if (init) {
            bgAudio.play();
        }
    }, [init]);

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
                position: "relative",
                background: "#1b1b1b",
                overflow: "hidden",
                // minHeight: "100vh",
            }}
        >
            <video
                playsInline
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
                ref={cRef}
            >
                <source src={CVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <video
                playsInline
                loop
                muted
                style={{
                    width: "100%",
                    left: 0,
                    top: 0,
                    objectFit: "cover",
                    position: "absolute",
                    opacity: wMode ? 0 : 0.5,
                    mixBlendMode: "screen",
                }}
                autoPlay
                ref={wRef}
            >
                <source src={WVideo} type="video/mp4" />
                Your browser does not support the video tag.
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
                onEsc={() => {}}
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
                        padding: isPc ? "50px 20px 100px" : "20px 16px",
                        minHeight: "100%",
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

                    {mode === "play" && (
                        <Play
                            onModeChange={(mode: string) => {
                                handleChangeMode(mode);
                            }}
                        ></Play>
                    )}
                </ModalContent>
            </Modal>
            {!init && (
                <Lock
                    onChangeInit={() => {
                        setInit(true);
                    }}
                ></Lock>
            )}
            <TournamentHelmet></TournamentHelmet>
        </Box>
    );
};

export default Introduce;
