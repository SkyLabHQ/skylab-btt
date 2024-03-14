import React from "react";
import Buycon from "./assets/buy.png";
import PlanetIcon from "./assets/planet.png";
import SubIcon from "./assets/sub.svg";
import AddIcon from "./assets/add.svg";
import BETHIcon from "./assets/b-ETH.png";
import BuyIcon from "./assets/buy-icon.svg";

import {
    Box,
    Image,
    Flex,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useDisclosure,
    Input,
    useMediaQuery,
} from "@chakra-ui/react";
import { accMul, parseAmount } from "@/utils/formatBalance";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import { usePublicClient } from "wagmi";
const BuyBt = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const publicClient = usePublicClient();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [inputAmount, setInputAmount] = React.useState(1);
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();

    const handleMintPlane = async () => {
        try {
            const hash = await mercuryJarTournamentContract.write.mint(
                [inputAmount],
                {
                    value: parseAmount(accMul("0.02", inputAmount.toString())),
                },
            );
            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }
        } catch (e) {
            console.log(e, "e");
            toast(handleError(e));
        }
    };
    return (
        <Popover
            gutter={38}
            arrowSize={20}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Image
                    tabIndex={0}
                    role="button"
                    src={Buycon}
                    sx={{
                        width: isPc ? "313px" : "110px",

                        position: "absolute",
                        left: "0",
                        bottom: "0",
                    }}
                ></Image>
            </PopoverTrigger>
            <PopoverContent
                width={"240px"}
                sx={{
                    border: "2px solid #F2D861",
                    borderRadius: "10px",
                    background: "rgb(61,61,61)",
                }}
            >
                <PopoverBody sx={{}}>
                    <Flex flexDir={"column"} align={"center"}>
                        <Image
                            src={PlanetIcon}
                            sx={{
                                width: "90px",
                                height: "90px",
                            }}
                        ></Image>
                        <Flex
                            justify={"space-between"}
                            sx={{
                                width: "170px",
                                borderRadius: "30px",
                                background: "rgba(0, 0, 0, 0.60)",
                                padding: "2px",
                                margin: "0 auto",
                                height: "38px",
                                marginTop: "9px",
                                border: "1px solid #F2D861",
                            }}
                        >
                            <Flex
                                sx={{
                                    width: "32px",
                                    height: "32px",
                                    background:
                                        inputAmount > 1 ? "#F2D861" : "#777",
                                    borderRadius: "50%",
                                    color: "#1B1B1B",
                                }}
                                justify={"center"}
                                align={"center"}
                                onClick={() => {
                                    if (inputAmount > 1) {
                                        setInputAmount(inputAmount - 1);
                                    }
                                }}
                            >
                                <Image
                                    src={SubIcon}
                                    sx={{
                                        width: "16px",
                                    }}
                                ></Image>
                            </Flex>
                            <Input
                                variant={"unstyled"}
                                sx={{
                                    flex: 1,
                                    textAlign: "center",
                                    color: "#fff",
                                    fontSize: "20px",
                                }}
                                value={inputAmount}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                                    setInputAmount(Number(value));
                                }}
                            ></Input>
                            <Flex
                                sx={{
                                    width: "32px",
                                    height: "32px",
                                    background: "#F2D861",
                                    borderRadius: "50%",
                                    color: "#1B1B1B",
                                }}
                                justify={"center"}
                                align={"center"}
                                onClick={() => {
                                    setInputAmount(inputAmount + 1);
                                }}
                            >
                                <Image
                                    src={AddIcon}
                                    sx={{
                                        width: "16px",
                                    }}
                                ></Image>
                            </Flex>
                        </Flex>
                        <Flex
                            onClick={handleMintPlane}
                            sx={{
                                width: "180px",
                                height: "40px",
                                borderRadius: "12px",
                                background: "#f2d861",
                                margin: "8px 0 24px",
                                fontSize: "16px",
                                padding: "0 12px",
                                color: "#000",
                                cursor: "pointer",
                            }}
                            align={"center"}
                            justify={"space-between"}
                        >
                            <Flex align={"center"} justify={"center"} flex={1}>
                                <Image
                                    src={BuyIcon}
                                    sx={{
                                        width: "12px",
                                        marginRight: "5px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        fontFamily: "Quantico",
                                    }}
                                >
                                    BUY
                                </Text>
                            </Flex>

                            <Box
                                sx={{
                                    width: "1px",
                                    height: "16px",
                                    background: "#1b1b1b",
                                }}
                            ></Box>
                            <Flex align={"center"} justify={"center"} flex={1}>
                                <Text
                                    sx={{
                                        marginRight: "3px",
                                    }}
                                >
                                    {accMul("0.02", inputAmount.toString())}
                                </Text>
                                <Image
                                    src={BETHIcon}
                                    sx={{
                                        width: "8px",
                                    }}
                                ></Image>
                            </Flex>
                        </Flex>
                    </Flex>
                </PopoverBody>
                <Box
                    sx={{
                        height: "0",
                        width: "0",
                        borderTop: "12px solid #F2D861",
                        borderRight: "12px solid transparent",
                        borderBottom: "12px solid transparent",
                        borderLeft: "12px solid transparent",
                        position: "absolute",
                        left: "18px",
                        bottom: "-24px",
                    }}
                ></Box>
                <Box
                    sx={{
                        height: "0",
                        width: "0",
                        borderTop: "10px solid rgb(61,61,61)",
                        borderRight: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        borderLeft: "10px solid transparent",
                        position: "absolute",
                        left: "20px",
                        bottom: "-20px",
                    }}
                ></Box>
            </PopoverContent>
        </Popover>
    );
};

export default BuyBt;
