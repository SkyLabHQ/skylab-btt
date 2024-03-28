import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import BidTacToeTutorial from "@/components/TacToe/BidTacToeTutorial";
import BulbIcon from "@/components/TacToe/assets/bulb.svg";
import PlayBackIcon from "./assets/playback-icon.svg";
import WalletIcon from "./assets/wallet-icon.png";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "@/utils";
import MyPilot from "../MyPilot";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import useSkyToast from "@/hooks/useSkyToast";

export const Toolbar = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfoRequest();
    const { ready, authenticated, login, user, connectWallet } = usePrivy();
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfoRequest();
    const handleLogin = () => {
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }

        if (user && user.wallet.walletClientType !== "privy") {
            connectWallet();
            return;
        }
        login();
    };

    return (
        <Box
            sx={{
                position: "absolute",
                right: "3.125vw",
                top: "1.4063vw",
                display: "flex",
                rowGap: isPc ? "12px" : "0.7292vw",
            }}
        >
            <Box>
                {address ? (
                    <MyPilot
                        onClick={onUserInfoOpen}
                        imgUrl={activePilot.img}
                        sx={{
                            width: isPc ? "2.3958vw" : "32px",
                            height: isPc ? "2.3958vw" : "32px",
                            cursor: "pointer",
                        }}
                    ></MyPilot>
                ) : (
                    <Image
                        onClick={handleLogin}
                        src={WalletIcon}
                        sx={{
                            width: isPc ? "2.3958vw" : "32px",
                            height: isPc ? "2.3958vw" : "32px",
                            cursor: "pointer",
                        }}
                    ></Image>
                )}
            </Box>
            <Image
                src={PlayBackIcon}
                sx={{
                    width: isPc ? "2.3958vw" : "32px",
                    height: isPc ? "2.3958vw" : "32px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    navigate("/btt/history");
                }}
            ></Image>
            <BidTacToeTutorial>
                <Image
                    sx={{
                        width: isPc ? "2.3958vw" : "32px",
                        height: isPc ? "2.3958vw" : "32px",
                    }}
                    src={BulbIcon}
                ></Image>
            </BidTacToeTutorial>
        </Box>
    );
};
