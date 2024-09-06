import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import RuleWrap from "./RuleWrap";
import { BlackButton } from "./Button";
import { ReactComponent as NextIcon } from "./assets/enter.svg";
import { useNavigate } from "react-router-dom";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const Lock = ({ onChangeInit }: { onChangeInit: () => void }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const [show, setShow] = useState(false);
    const codeRef = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleCodeChange = (index: number, value: string) => {
        if (value.length >= 1) {
            codeRef[index].current.value = value.slice(0, 1);
            if (index === 4) return;
            codeRef[index + 1].current.focus();
        } else {
            codeRef[index].current.value = "";
        }
    };

    const handleBackspace = () => {
        for (let i = 4; i >= 0; i--) {
            if (codeRef[i].current.value) {
                codeRef[i].current.value = "";
                codeRef[i].current.focus();
                break;
            }
        }
    };

    const handleConfirm = () => {
        let code = "";
        for (let i = 0; i < 5; i++) {
            code += codeRef[i].current.value;
        }

        if (code.length < 5) return;

        if (code.toLocaleLowerCase() === "mmosg") {
            onChangeInit();
        } else {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    };

    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            if (key === "Backspace") {
                handleBackspace();
            } else if (key === "Enter") {
                handleConfirm();
            }
        };

        const handlePaste = (event: ClipboardEvent) => {
            event.preventDefault();
            const clipboardData = event.clipboardData;
            const pastedData = clipboardData.getData("Text");
            let j = 0;

            for (let i = 0; i < Math.min(5, pastedData.length); i++) {
                if (codeRef[i]?.current.value) {
                    continue;
                } else {
                    codeRef[i].current.value = pastedData[j++].toUpperCase();
                }
            }
        };

        document.addEventListener("paste", handlePaste);
        document.addEventListener("keydown", keyboardListener);

        return () => {
            document.removeEventListener("keydown", keyboardListener);
            document.removeEventListener("paste", handlePaste);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <Flex
            sx={{
                position: "fixed",
                left: 0,
                top: 0,
                height: "100%",
                width: "100%",
                background: "rgba(0, 0, 0, 0.24)",
                backdropFilter: "blur(50px)",
                zIndex: 10,
                fontFamily: "Orbitron",
            }}
            flexDir={"column"}
            align={"center"}
            justify={"center"}
        >
            <Text
                sx={{
                    textAlign: "center",
                    color: "#FFD000",
                    fontFamily: "Orbitron",
                    fontSize: isPc ? "24px" : "18px",
                    fontWeight: 700,
                }}
            >
                Enter Password
            </Text>

            <Text
                sx={{
                    color: "#D40000",
                    textAlign: "center",
                    fontSize: isPc ? "18px" : "14px",
                    fontWeight: 700,
                    marginTop: "4px",
                    opacity: show ? 1 : 0,
                }}
            >
                Incorrect Password!
            </Text>
            <RuleWrap
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.20) !important",
                    width: isPc ? "436px" : "300px",
                    height: isPc ? "95px" : "65px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "12px",
                    padding: isPc ? "20px !important" : "10px !important",
                }}
            >
                {codeRef.map((item, index) => {
                    return (
                        <Input
                            onFocus={() => {
                                for (let i = 0; i < 5; i++) {
                                    if (codeRef[i].current.value) {
                                        continue;
                                    } else {
                                        codeRef[i].current.focus();
                                        break;
                                    }
                                }
                            }}
                            key={index}
                            ref={item}
                            onChange={(e) => {
                                const value = e.target.value
                                    .replace(/[^A-Za-z0-9]$/g, "")
                                    .toUpperCase();
                                handleCodeChange(index, value);
                            }}
                            variant={"unstyled"}
                            sx={{
                                fontSize: isPc ? "20px" : "14px",
                                width: isPc ? "60px" : "40px",
                                height: isPc ? "60px" : "40px",
                                border: "2px solid #fff",
                                padding: "0 10px",
                                background: "#616161",
                                textAlign: "center",
                                color: "#fff",
                            }}
                        />
                    );
                })}
            </RuleWrap>

            <BlackButton
                onClick={handleConfirm}
                sx={{
                    width: isPc ? "250px" : "120px",
                    height: isPc ? "60px" : "25px",
                    marginTop: "20px",
                    background: "rgba(0, 0, 0, 0.20) !important",
                }}
            >
                {isPc && (
                    <NextIcon
                        style={{ marginRight: "24px", width: "18px" }}
                    ></NextIcon>
                )}
                <Text>Confirm</Text>
            </BlackButton>
        </Flex>
    );
};

export default Lock;
