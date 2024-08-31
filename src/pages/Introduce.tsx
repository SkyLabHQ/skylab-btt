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
import { createRef, useState } from "react";
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
        if (wMode) {
            if (cRef.current) {
                cRef.current.play();
                wRef.current?.play();
            }

            setWMode(false);
        } else {
            console.log("wRef.c", wRef.current);
            if (wRef.current) {
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
                onModeChange={(mode: string) => {
                    handleChangeMode(mode);
                }}
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
                        padding: "200px 20px 0",
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
