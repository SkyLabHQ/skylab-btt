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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApyUpIcon from "@/assets/apy-up.svg";
import A1 from "./assets/a1.png";
import { LButton } from "../Button/Index";
import XP from "@/assets/xp.svg";
import EthIcon from "@/assets/eth.png";
import SelectTeam from "../League/SelectTeam";
import { leagueAddressList } from "@/utils/league";
import ChampionIcon from "./assets/champion.svg";
import GArrow from "./assets/g-arror.svg";
import PerIcon from "./assets/per.svg";
import TipIcon from "@/assets/tip.svg";
import {
    useMultiLeagueTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { accAdd, formatAmount } from "@/utils/formatBalance";
import EnterIcon from "@/assets/enter.svg";

const WinIcon = () => {
    return (
        <Flex
            align={"center"}
            flexDir={"column"}
            sx={{
                width: "100px",
            }}
        >
            <Text
                sx={{
                    color: "#24FF00",
                    textAlign: "center",

                    fontSize: "16px",

                    fontWeight: 900,
                }}
            >
                WINS
            </Text>
            <Image src={GArrow}></Image>
        </Flex>
    );
};

const Rewards = ({ amount }: { amount: string }) => {
    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            sx={{
                width: "100px",
            }}
        >
            <Text
                sx={{
                    fontSize: "14px",
                    fontWeight: 900,
                }}
            >
                REWARDS
            </Text>
            <Flex align={"center"}>
                <Image
                    src={EthIcon}
                    sx={{
                        width: "15px",
                        marginRight: "6px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontSize: "30px",
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    {amount}
                </Text>
            </Flex>
        </Flex>
    );
};

const initLeagueInfoList = leagueAddressList.map((item) => {
    return {
        isLocked: false,
        leagueOwnerPercentage: 0,
        newComerPercentage: 0,
        premium: "0",
        leader: item,
    };
});

const ChooseTeamModal = ({
    mintType,
    handleMint,
    isOpen,
    onClose,
}: {
    mintType: "paperToPlane" | "toPlane";
    handleMint: (leader: string) => void;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const chainId = useChainId();
    const [leagueInfoList, setLeagueInfoList] = useState(initLeagueInfoList);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);

    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
    };

    const handleInit = async () => {
        const p = [];
        for (let i = 0; i < leagueAddressList.length; i++) {
            const leaderAddress = leagueAddressList[i];
            p.push(multiLeagueTournamentContract.getLeagueInfo(leaderAddress));
        }

        const leagueListRes = await multiProvider.all(p);

        const leagueInfoList: any = [];
        leagueListRes.forEach((item, index) => {
            leagueInfoList.push({
                isLocked: item.isLocked,
                leagueOwnerPercentage: item.leagueOwnerPercentage.toNumber(),
                newComerPercentage: item.newComerPercentage.toNumber(),
                premium: item.premium.toString(),
                leader: leagueAddressList[index],
            });
        });

        setLeagueInfoList(leagueInfoList);
    };

    useEffect(() => {
        if (!multiLeagueTournamentContract || !multiProvider) return;
        handleInit();
    }, [multiLeagueTournamentContract, multiProvider]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay backdropFilter={"blur(35px)"} />
            <ModalContent
                bg="rgba(0, 0, 0, 0.5)"
                border="1px solid #FDDC2D"
                borderRadius="8px"
                maxW={isPc ? "800px" : "300px"}
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
                            fontFamily={"Orbitron"}
                            textAlign={"center"}
                            sx={{
                                color: "#fff",
                            }}
                        >
                            CHOOSE YOUR FAVOURITE TEAM FIRST
                        </Text>
                        <Box
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            <SelectTeam
                                activeIndex={activeIndex}
                                onActiveIndex={handleActiveIndex}
                            ></SelectTeam>
                        </Box>

                        <Flex
                            align={"center"}
                            sx={{
                                marginTop: "30px",
                            }}
                        >
                            <Flex
                                align={"center"}
                                flexDir={"column"}
                                sx={{
                                    width: "100px",
                                }}
                            >
                                <Image src={ChampionIcon}></Image>
                                <Flex></Flex>
                                <Text
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 900,
                                    }}
                                >
                                    CHAMPION
                                </Text>
                            </Flex>
                            <WinIcon></WinIcon>
                            <Rewards amount={"2.99"}></Rewards>
                        </Flex>
                        <Flex
                            align={"center"}
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            <Flex
                                align={"center"}
                                flexDir={"column"}
                                sx={{
                                    width: "100px",
                                }}
                            >
                                <Image src={PerIcon}></Image>
                                <Flex align={"center"}>
                                    <Image
                                        src={TipIcon}
                                        sx={{
                                            marginRight: "5px",
                                        }}
                                    ></Image>
                                    <Text>PER.</Text>
                                    <Image
                                        src={XP}
                                        sx={{
                                            width: "20px",
                                        }}
                                    ></Image>
                                </Flex>
                                <Flex align={"center"}>
                                    <Image
                                        src={EthIcon}
                                        sx={{
                                            width: "8px",
                                            marginRight: "4px",
                                        }}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            lineHeight: 1,
                                        }}
                                    >
                                        0.99
                                    </Text>
                                </Flex>
                            </Flex>
                            <WinIcon></WinIcon>
                            <Rewards amount="2.99"></Rewards>
                        </Flex>

                        <Flex
                            align={"center"}
                            gap={"20px"}
                            justify={"center"}
                            sx={{
                                marginTop: "74px",
                                borderTop: "1px dashed #fff",
                                width: "100%",
                                paddingTop: "80px",
                            }}
                        >
                            <LButton
                                sx={{
                                    width: "113px",
                                    height: "46px",
                                }}
                                onClick={onClose}
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
                            <Box
                                sx={{
                                    position: "relative",
                                }}
                            >
                                <Flex
                                    sx={{
                                        position: "absolute",
                                        top: "-50px",
                                        left: 0,
                                        width: "100%",
                                    }}
                                    justify={"space-around"}
                                    align={"flex-end"}
                                >
                                    <Box>
                                        <Image
                                            src={A1}
                                            sx={{
                                                width: "70px",
                                            }}
                                        ></Image>
                                        <Text
                                            sx={{
                                                textAlign: "center",
                                                fontSize: "12px",
                                                lineHeight: 1,
                                            }}
                                        >
                                            Lvl.{" "}
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                1
                                            </span>
                                        </Text>
                                    </Box>
                                    <Flex align={"center"}>
                                        <Image
                                            src={XP}
                                            sx={{
                                                width: "20px",
                                                marginTop: "2px",
                                                marginRight: "4px",
                                            }}
                                        ></Image>
                                        <Text
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: 700,
                                                lineHeight: "1",
                                            }}
                                        >
                                            1
                                        </Text>
                                    </Flex>
                                </Flex>
                                <LButton
                                    onClick={() => {
                                        handleMint(
                                            leagueAddressList[activeIndex],
                                        );
                                    }}
                                    sx={{
                                        width: "170px",
                                        height: "46px",
                                    }}
                                    alignContent={"center"}
                                >
                                    {mintType === "toPlane" && (
                                        <>
                                            <Text
                                                sx={{
                                                    color: "#fff",
                                                    fontSize: "14px",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Buy
                                            </Text>
                                            <Image
                                                src={EthIcon}
                                                sx={{
                                                    width: "8px",
                                                    margin: "0 6px 0 20px",
                                                }}
                                            ></Image>
                                            <Text
                                                sx={{
                                                    marginRight: "6px",
                                                }}
                                            >
                                                {" "}
                                                {accAdd(
                                                    "0.02",
                                                    formatAmount(
                                                        leagueInfoList[
                                                            activeIndex
                                                        ].premium,
                                                    ),
                                                )}
                                            </Text>
                                            <Image src={ApyUpIcon}></Image>
                                        </>
                                    )}

                                    {mintType === "paperToPlane" && (
                                        <>
                                            <Image
                                                src={EnterIcon}
                                                sx={{
                                                    width: "12px",
                                                    marginRight: "10px",
                                                }}
                                            ></Image>
                                            <Text
                                                sx={{
                                                    fontSize: "14px",
                                                    fontStyle: "normal",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Confirm
                                            </Text>
                                        </>
                                    )}
                                </LButton>
                            </Box>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ChooseTeamModal;
