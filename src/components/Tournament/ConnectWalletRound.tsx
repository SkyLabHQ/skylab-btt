import { Box, Button, Text } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { SubmitButton } from "../Button/Index";
import { useAccount } from "wagmi";

interface ChildProps {
    onNextRound: (nextStep: number) => void;
}

const ConnectWalletRound = ({ onNextRound }: ChildProps) => {
    const { address } = useAccount();

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
                height: "100vh",
                background: "rgba(0, 0, 0, 0.3)",
                zIndex: 200,
            }}
        >
            <Box
                w="25.2604vw"
                left="50%"
                top="50%"
                transform="translateX(-50%)"
                paddingTop="1.0417vw"
                zIndex={22}
                pos="absolute"
                cursor={"pointer"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ConnectKitButton.Custom>
                    {({
                        isConnected,
                        isConnecting,
                        show,
                        hide,
                        address,
                        ensName,
                        chain,
                    }) => {
                        return (
                            <SubmitButton width="100%" onClick={show}>
                                <Text
                                    fontSize="1.875vw"
                                    color="#000"
                                    fontWeight="600"
                                    textAlign="center"
                                >
                                    Connect Wallet
                                </Text>
                            </SubmitButton>
                        );
                    }}
                </ConnectKitButton.Custom>

                <Button
                    variant={"unstyled"}
                    onClick={() => {
                        onNextRound(2);
                    }}
                >
                    <Text
                        sx={{
                            textDecoration: "underline",
                        }}
                    >
                        Skip
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default ConnectWalletRound;
