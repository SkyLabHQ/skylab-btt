import useSkyToast from "@/hooks/useSkyToast";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as LBorder } from "./assets/l-border.svg";
import { ReactComponent as RBorder } from "./assets/r-border.svg";
import RuleWrap from "./RuleWrap";
import { BlackButton } from "./Button";
import { ReactComponent as NextIcon } from "./assets/enter.svg";

const Lock = ({ onChangeInit }: { onChangeInit: () => void }) => {
    const [inputValue, setInputValue] = useState();
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
    const toast = useSkyToast();

    const handleConfirm = () => {
        let code = "";
        for (let i = 0; i < 5; i++) {
            code += codeRef[i].current.value;
        }

        if (code.toLocaleLowerCase() === "mmosg") {
            onChangeInit();
        } else {
            toast("Password error");
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
        document.addEventListener("keydown", keyboardListener);

        document.addEventListener("paste", function (event) {
            // 阻止默认的粘贴行为
            event.preventDefault();
            // 获取剪贴板数据
            var clipboardData = event.clipboardData;
            var pastedData = clipboardData.getData("Text");
            let j = 0;

            for (let i = 0; i < Math.min(5, pastedData.length); i++) {
                if (codeRef[i]?.current.value) {
                    continue;
                } else {
                    codeRef[i].current.value = pastedData[j++].toUpperCase();
                }
            }
            // 打印粘贴的内容
        });

        return () => {
            document.removeEventListener("keydown", keyboardListener);
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
                    fontSize: "24px",
                    fontWeight: 700,
                }}
            >
                Enter Password
            </Text>

            <RuleWrap
                sx={{
                    background: "rgba(0, 0, 0, 0.20) !important",

                    width: "436px",
                    height: "95px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "33px",
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
                                fontSize: "20px",
                                width: "60px",
                                height: "60px",
                                border: "2px solid #fff",
                                padding: "0 0.5208vw",
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
                    width: "250px",
                    height: "60px",
                    marginTop: "20px",
                    // background: "transparent !important",
                    background: "rgba(0, 0, 0, 0.20) !important",
                }}
            >
                <NextIcon
                    style={{ marginRight: "24px", width: "18px" }}
                ></NextIcon>
                <Text>Continue</Text>
            </BlackButton>
        </Flex>
    );
};

export default Lock;
