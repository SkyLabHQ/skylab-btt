import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Image,
    SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LButton } from "../Button/Index";
import { useUserInfo } from "@/contexts/UserInfo";
import {
    useMultiLeagueTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { TokenIdInfo } from ".";
import { leagueBg } from "@/utils/league";
import XP from "@/assets/xp.svg";
import { ReactComponent as LbIcon } from "@/assets/l-b.svg";
import { ReactComponent as RbIcon } from "@/assets/r-b.svg";
import EnterIcon from "@/assets/enter.svg";
import VideoComponent from "../Video";

const TokenInfoItem = ({
    isSelect,
    tokenInfo,
    onClick,
}: {
    isSelect: boolean;
    tokenInfo: TokenIdInfo;
    onClick: () => void;
}) => {
    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            onClick={onClick}
            sx={{
                border: isSelect ? "1px solid #999" : "1px solid transparent",
                width: "150px",
                height: "200px",
                padding: "10px 0",
                position: "relative",
                cursor: "pointer",
            }}
        >
            {isSelect && (
                <>
                    <LbIcon
                        style={{
                            position: "absolute",
                            left: "-2px",
                            top: "-2px",
                        }}
                    ></LbIcon>
                    <RbIcon
                        style={{
                            position: "absolute",
                            right: "-2px",
                            bottom: "-2px",
                        }}
                    ></RbIcon>
                </>
            )}

            <Flex
                align={"center"}
                flexDir={"column"}
                justify={"center"}
                sx={{
                    width: "110px",
                    height: "110px",
                    position: "relative",
                }}
            >
                <VideoComponent
                    url={leagueBg[tokenInfo.leader]}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",

                        width: "110px",
                        height: "110px",
                    }}
                ></VideoComponent>

                <Image
                    src={tokenInfo.img}
                    sx={{
                        width: "100px",
                    }}
                ></Image>
                <Text
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                    }}
                >
                    Lvl.{" "}
                    <span
                        style={{
                            fontSize: "16px",
                        }}
                    >
                        {tokenInfo.level}
                    </span>
                </Text>
            </Flex>
            <Text
                sx={{
                    fontSize: "12px",
                }}
            >
                #{tokenInfo.tokenId}
            </Text>
            <Flex>
                <Image
                    src={XP}
                    sx={{
                        width: "18px",
                        marginTop: "4px",
                        marginRight: "4px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                    }}
                >
                    {tokenInfo.point}
                </Text>
            </Flex>
            <Box
                sx={{
                    width: "102px",
                    height: "8px",
                    borderRadius: "4px",
                    border: "1px solid #fff",
                }}
            >
                <Box
                    sx={{
                        width: `${
                            ((tokenInfo.point - tokenInfo.prePoint) /
                                (tokenInfo.nextPoint - tokenInfo.prePoint)) *
                            100
                        }%`,
                        height: "100%",
                        backgroundColor: "#FDDC2D",
                    }}
                ></Box>
            </Box>
        </Flex>
    );
};

const ChooseTeamModal = ({
    myTokenIdsInfo,
    isOpen,
    onClose,
}: {
    myTokenIdsInfo: TokenIdInfo[];
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const [selectIndex, setSelectIndex] = useState(-1);
    const { address } = useUserInfo();
    const chainId = useChainId();
    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);

    const handleSelect = (index: number) => {
        setSelectIndex(index);
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectIndex(-1);
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay backdropFilter={"blur(35px)"} />
            <ModalContent
                bg="rgba(0, 0, 0, 0.5)"
                border="1px solid #FDDC2D"
                borderRadius="8px"
                maxW={isPc ? "800px" : "100%"}
            >
                <ModalBody pb="20px" pt={"20px"}>
                    <Flex
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                        flexDir={"column"}
                        align={"center"}
                    >
                        <Text
                            fontSize={isPc ? "24px" : "20px"}
                            fontWeight="700"
                            textAlign={"center"}
                            sx={{
                                color: "#fff",
                            }}
                        >
                            CHOOSE YOUR PLANE FIRST
                        </Text>
                        <SimpleGrid
                            sx={{
                                width: "100%",
                                maxWidth: "600px",
                                marginTop: "20px",
                                height: "500px",
                                overflowY: "auto",
                                overflowX: "hidden",
                                "::-webkit-scrollbar": {
                                    width: "0",
                                },
                            }}
                            columns={4}
                            rowGap={"24px"}
                        >
                            {myTokenIdsInfo.map((item, index) => {
                                return (
                                    <TokenInfoItem
                                        isSelect={selectIndex === index}
                                        onClick={() => {
                                            handleSelect(index);
                                        }}
                                        key={index}
                                        tokenInfo={item}
                                    ></TokenInfoItem>
                                );
                            })}
                        </SimpleGrid>

                        <Flex
                            align={"center"}
                            gap={"20px"}
                            sx={{
                                marginTop: "24px",
                            }}
                        >
                            <LButton
                                sx={{
                                    width: "113px",
                                    height: "46px",
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "8px",
                                    }}
                                >
                                    esc
                                </Text>
                                <Text
                                    sx={{
                                        color: "#fff",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                    }}
                                >
                                    Cancel
                                </Text>
                            </LButton>
                            <LButton
                                sx={{
                                    width: "113px",
                                    height: "46px",
                                }}
                                alignContent={"center"}
                            >
                                <Image
                                    src={EnterIcon}
                                    sx={{
                                        width: "10px",
                                        marginRight: "6px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        color: "#fff",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                    }}
                                >
                                    Confirm
                                </Text>
                            </LButton>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ChooseTeamModal;
