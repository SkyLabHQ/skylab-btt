import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { SubmitButton } from "../Button/Index";
import useSkyToast from "@/hooks/useSkyToast";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

interface ChildProps {
    onNextRound: (nextStep: number) => void;
}

const ConnectWalletRound = ({ onNextRound }: ChildProps) => {
    const { ready, authenticated, login } = usePrivy();
    const { signer, address } = usePrivyAccounts();

    const disableLogin = !ready || (ready && authenticated);
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();

    useEffect(() => {
        if (address) {
            onNextRound(2);
        }
    }, [address]);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100%",
                background: "rgba(0, 0, 0, 0.3)",
                zIndex: 200,
            }}
        >
            <Flex
                zIndex={22}
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <SubmitButton
                    width="100%"
                    onClick={() => {
                        if (disableLogin) {
                            console.log("disableLogin", disableLogin);
                            return;
                        }
                        login();
                    }}
                    style={{
                        width: isPc ? "25.2604vw" : "250px",
                        height: isPc ? "3.8021vw" : "30px",
                    }}
                >
                    <Text
                        fontSize={isPc ? "1.875vw" : "16px"}
                        color="#000"
                        fontWeight="600"
                        textAlign="center"
                    >
                        Connect Wallet
                    </Text>
                </SubmitButton>

                <Button
                    variant={"unstyled"}
                    onClick={() => {
                        onNextRound(2);
                    }}
                    sx={{
                        padding: 0,
                    }}
                >
                    <Text
                        sx={{
                            textDecoration: "underline",
                            fontSize: isPc ? "0.8333vw" : "12px",
                        }}
                    >
                        Skip
                    </Text>
                </Button>
            </Flex>
        </Box>
    );
};

export default ConnectWalletRound;
