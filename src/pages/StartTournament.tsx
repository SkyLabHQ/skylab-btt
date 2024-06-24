import { useCheckBurnerBalanceAndApprove } from "@/hooks/useBurnerWallet";
import { Box, useMediaQuery, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBidTacToeFactoryRetry } from "@/hooks/useRetryContract";
import { handleError } from "@/utils/error";
import { mercuryJarTournamentAddress } from "@/hooks/useContract";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { DEAFAULT_CHAINID } from "@/utils/web3Utils";
import ButtonBg from "@/assets/bt-bg.png";
import { motion } from "framer-motion";
import useSkyToast from "@/hooks/useSkyToast";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import { getDefaultWithProvider } from "@/hooks/useSigner";
import { useChainId } from "wagmi";
import { ZERO_DATA } from "@/skyConstants";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import SelectPlane from "@/components/TacToeMode/SelectPlane";
import { privateKeyToAccount } from "viem/accounts";
import Nest from "@/components/Nest";
import HumanPlane from "@/assets/human-plane.png";

export interface PlaneInfo {
    tokenId: number;
    level: number;
    img: string;
    round: number;
    state: boolean;
}

const StartTournament = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { openLoading, closeLoading } = useSubmitRequest();
    const navigate = useNavigate();
    const chainId = useChainId();
    const [selectPlane, setSelectPlane] = useState<any>({});
    const checkBurnerBalanceAndApprove = useCheckBurnerBalanceAndApprove();
    const toast = useSkyToast();
    const multiProvider = useMultiProvider(chainId);
    const tacToeFactoryRetryWrite = useBidTacToeFactoryRetry();

    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(DEAFAULT_CHAINID);

    const handleTournament = async () => {
        const tokenId = selectPlane?.tokenId;
        try {
            if (selectPlane.state) {
                let objPrivateKey = {};
                let stringPrivateKey = localStorage.getItem("tactoePrivateKey");
                try {
                    objPrivateKey = stringPrivateKey
                        ? JSON.parse(stringPrivateKey)
                        : {};
                } catch (e) {
                    objPrivateKey = {};
                }
                const key = chainId + "-" + tokenId;
                const account = privateKeyToAccount(objPrivateKey[key]);
                if (!account) {
                    return;
                }
                const [bidTacToeGameAddress] = await multiProvider.all([
                    multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                        account.address,
                    ),
                ]);

                if (bidTacToeGameAddress !== ZERO_DATA) {
                    navigate(
                        `/btt/game?gameAddress=${bidTacToeGameAddress}&tokenId=${tokenId}`,
                    );
                    return;
                }
            }

            openLoading();
            const defaultSinger = getDefaultWithProvider(tokenId, chainId);

            await checkBurnerBalanceAndApprove(
                mercuryJarTournamentAddress[chainId],
                tokenId,
                defaultSinger.account.address,
            );

            await tacToeFactoryRetryWrite(
                "createOrJoinDefault",
                [[3, 3, 3, 100, 1, 0, false, 12 * 60 * 60], false],
                {
                    gasLimit: 1000000,
                    signer: defaultSinger,
                },
            );

            setTimeout(() => {
                closeLoading();
                const url = `/btt/match?tokenId=${tokenId}`;
                navigate(url);
            }, 1000);
        } catch (e) {
            closeLoading();
            console.log(e);
            toast(handleError(e));
        }
    };

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: isPc ? "120px" : "40px",
                    flexDirection: "column",
                    height: "100%",
                    fontFamily: "Orbitron",
                    width: "100%",
                }}
            >
                <Toolbar></Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: isPc ? "390px" : "100%",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 100 }} // 初始状态：透明且在原位置右边100px的位置
                            animate={{ opacity: 1, x: 0 }} // 结束状态：完全不透明且在原位置
                            exit={{ opacity: 0, x: -100 }} // 退出状态：透明且在原位置左边100px的位置
                            transition={{ duration: 0.5 }}
                            style={{
                                width: "100%",
                            }}
                        >
                            <Flex
                                align={"center"}
                                onClick={handleTournament}
                                alignItems={"center"}
                                justify={"center"}
                                sx={{
                                    width: "194px",
                                    height: "60px",
                                    marginTop: isPc ? "36px" : "20px",
                                    cursor: "pointer",
                                    background: `url(${ButtonBg})`,
                                    backgroundSize: "100% 100%",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={HumanPlane}
                                    sx={{
                                        position: "absolute",
                                        left: "-10px",
                                        top: "20%",
                                        width: "100px",
                                        transform: "translateY(-50%)",
                                    }}
                                ></Image>
                                <Flex
                                    flexDirection={"column"}
                                    align={"center"}
                                    sx={{
                                        paddingLeft: "40px",
                                    }}
                                >
                                    <Text
                                        className="play-button-text"
                                        sx={{
                                            color: "#fff",
                                        }}
                                    >
                                        Start Game
                                    </Text>
                                    <Text
                                        className="play-button-text"
                                        sx={{
                                            fontSize: "12px",
                                            color: "#D7C878",
                                        }}
                                    >
                                        With Plane
                                    </Text>
                                </Flex>
                            </Flex>
                        </motion.div>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        bottom: 0,
                        transform: "translate(-50%, 0)",
                        width: isPc ? "800px" : "100%",
                        display: "block",
                    }}
                >
                    <SelectPlane
                        selectPlane={selectPlane}
                        onSelectPlane={(plane: any) => {
                            if (plane.tokenId === selectPlane.tokenId) {
                                setSelectPlane({});
                                return;
                            }
                            setSelectPlane(plane);
                        }}
                    ></SelectPlane>
                </Box>
            </Box>
            <Nest />
        </Box>
    );
};

export default StartTournament;
