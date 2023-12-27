import React, { useEffect, useRef } from "react";
import { Box, Text, Input, Flex } from "@chakra-ui/react";
import { GrayButton } from "../Button/Index";
import Loading from "../Loading";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { ZERO_DATA } from "@/skyConstants";
import useSkyToast from "@/hooks/useSkyToast";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [loading, setLoading] = React.useState(false);
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(TESTFLIGHT_CHAINID);

    const codeRef = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleCodeChange = (index: number, value: string) => {
        if (value.length >= 1) {
            codeRef[index].current.value = value.slice(0, 1);
            if (index === 5) return;
            codeRef[index + 1].current.focus();
        } else {
            codeRef[index].current.value = "";
        }
    };

    const handleBackspace = () => {
        for (let i = 5; i >= 0; i--) {
            if (codeRef[i].current.value) {
                codeRef[i].current.value = "";
                codeRef[i].current.focus();
                break;
            }
        }
    };

    const handleJoin = async () => {
        if (loading) return;
        setLoading(true);
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += codeRef[i].current.value;
        }

        const [address] = await multiProvider.all([
            multiSkylabBidTacToeFactoryContract.nameToPrivateLobby(code),
        ]);

        console.log(address, "address");
        if (address === ZERO_DATA) {
            toast("Invalid Lobby Code");
        } else {
            navigate(`/btt/privatelobby?lobbyAddress=${address}`);
        }

        setLoading(false);
    };

    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            switch (key) {
                case "Backspace":
                    handleBackspace();
                    break;
            }
        };
        document.addEventListener("keydown", keyboardListener);

        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "21.3542vw",
                margin: "0 auto",
            }}
        >
            <Text
                sx={{
                    width: "21.3542vw",
                    fontSize: "1.25vw",
                }}
            >
                Lobby Code
            </Text>
            <Flex
                justify={"space-between"}
                w={"100%"}
                sx={{
                    marginTop: "0.2083vw",
                    position: "relative",
                }}
            >
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    return (
                        <Input
                            onFocus={() => {
                                for (let i = 0; i < 6; i++) {
                                    if (codeRef[i].current.value) {
                                        continue;
                                    } else {
                                        codeRef[i].current.focus();
                                        break;
                                    }
                                }
                            }}
                            key={item}
                            ref={codeRef[index]}
                            onChange={(e) => {
                                const value = e.target.value
                                    .replace(/[^A-Za-z0-9]$/g, "")
                                    .toUpperCase();
                                handleCodeChange(index, value);
                            }}
                            variant={"unstyled"}
                            sx={{
                                fontSize: "1.25vw",
                                width: "3.125vw",
                                height: "3.125vw",
                                border: "2px solid #fff",
                                padding: "0 0.5208vw",
                                background: loading ? "#BCBBBE" : "#616161",
                                textAlign: "center",
                            }}
                        />
                    );
                })}
                {loading && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: "-1.6667vw",
                            top: "50%",
                            translateY: "-50%",
                        }}
                    >
                        <Loading size={40}></Loading>
                    </Box>
                )}
            </Flex>

            <GrayButton
                sx={{
                    width: "14.0625vw !important",
                    height: "3.3854vw !important",
                    justifyContent: "center !important",
                    marginTop: "1.6667vw",
                    background: loading ? "#BCBBBE" : "#616161",
                    boxShadow: loading && "none !important",
                    border: loading && "2px solid #fff !important",
                    "&:hover": {
                        background: loading ? "#BCBBBE" : "#616161",
                        boxShadow: loading && "none !important",
                        border: loading && "2px solid #fff !important",
                    },
                }}
                variant="outline"
                position={"relative"}
                onClick={handleJoin}
            >
                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.25vw",
                        }}
                    >
                        Join{" "}
                    </Text>
                </Box>
            </GrayButton>
        </Box>
    );
};

export default Join;
