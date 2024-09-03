import useSkyToast from "@/hooks/useSkyToast";
import { Box, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Lock = ({ onChangeInit }: { onChangeInit: () => void }) => {
    const [inputValue, setInputValue] = useState();
    const toast = useSkyToast();

    const handleConfirm = () => {
        if (inputValue === "MMOSG") {
            onChangeInit();
        } else {
            toast("password error");
        }
    };

    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            if (key === "Enter") {
                handleConfirm();
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, [inputValue]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                left: 0,
                top: 0,
                height: "100%",
                width: "100%",
                background: "#1b1b1b",
                zIndex: 10,
            }}
        >
            <Input
                sx={{
                    width: "200px",
                }}
                onChange={(e: any) => {
                    setInputValue(e.target.value);
                }}
            ></Input>
            <Box onClick={handleConfirm}>确定</Box>
        </Box>
    );
};

export default Lock;
