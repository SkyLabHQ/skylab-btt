import { WarningIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    Heading,
    Spinner,
    Stack,
    Text,
} from "@chakra-ui/react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { CHAIN_ID_MAP, PolygonIcon } from "../skyConstants";
import useAddNetworkToMetamask from "../hooks/useAddNetworkToMetamask";
import useEagerConnect from "../hooks/useEagerConnect";
import useInactiveListener from "../hooks/useInactiveListener";
import { ChainId, network, NETWORK_CONTEXT_NAME } from "../utils/web3Utils";

export default function Web3ReactManager({
    children,
}: {
    children: JSX.Element;
}): JSX.Element | null {
    // if we catch an error, prompt to switch to Polygon
    const addNetworkToMetask = useAddNetworkToMetamask();

    // eagerly connect to browser injected level
    const { active } = useWeb3React();
    const {
        active: networkActive,
        error: networkError,
        activate: activateNetwork,
    } = useWeb3React(NETWORK_CONTEXT_NAME);

    // try to eagerly connect to an injected provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !networkActive && !networkError && !active) {
            activateNetwork(network);
        }
    }, [triedEager, networkActive, networkError, activateNetwork, active]);

    // listen for changes on the injected connector, if exists
    useInactiveListener(!triedEager);

    // handle delayed loader state
    const [showLoader, setShowLoader] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(true);
        }, 600);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // spin if we havent tried eagerly connecting yet
    if (!triedEager) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" colorScheme="blue" />
            </Center>
        );
    }

    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (!active && networkError) {
        // get chain and network name from our map
        const chainId = /id: (\d*)/.exec(networkError.message);
        const networkName = CHAIN_ID_MAP[Number(chainId?.[1] || -1)];

        // handle errors
        if (networkError instanceof UnsupportedChainIdError) {
            return (
                <>
                    <Center minH="100vh">
                        <Stack spacing="30px" alignItems="center">
                            <WarningIcon fontSize="50px" />
                            <Stack spacing="10px" alignItems="center">
                                <Heading as="h1" fontSize="xx-large">
                                    Unsupported Network!{" "}
                                </Heading>
                                <Text color="whiteAlpha.600">
                                    You are connected on the {networkName}{" "}
                                    network. Please connect to the Polygon
                                    network.
                                </Text>
                            </Stack>
                            <Button
                                w="full"
                                onClick={() =>
                                    addNetworkToMetask(ChainId.POLYGON)
                                }
                                leftIcon={<PolygonIcon boxSize="27px" />}
                                variant="solid"
                            >
                                Switch to Polygon Network
                            </Button>
                        </Stack>
                    </Center>
                </>
            );
        } else if (networkError instanceof UserRejectedRequestError) {
            // TO-DO: add toast here
        } else {
            return (
                <Center minH="100vh">
                    <Heading as="h1" fontSize="xx-large">
                        Unknown error occurred. Please reload the page.
                    </Heading>
                </Center>
            );
        }
    }

    return children;
}
