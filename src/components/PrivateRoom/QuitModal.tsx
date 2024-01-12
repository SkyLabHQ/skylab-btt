import React from "react";
import {
    Text,
    Img,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from "@chakra-ui/react";
import CloseIcon from "@/assets/icon-close.svg";
import { handleError } from "@/utils/error";
import Loading from "../Loading";
import useSkyToast from "@/hooks/useSkyToast";
import {
    useBttGameRetry,
    useBttPrivateLobbyContract,
} from "@/hooks/useRetryContract";
import { useNavigate } from "react-router-dom";
import { usePrivateGameContext } from "@/pages/PrivateRoom";
import { getPrivateLobbySigner } from "@/hooks/useSigner";

const QuitModal = ({
    quitType,
    isOpen,
    onClose,
}: {
    quitType: "wait" | "game";
    isOpen: boolean;
    onClose: () => void;
}) => {
    const navigate = useNavigate();
    const { bidTacToeGameAddress, lobbyAddress } = usePrivateGameContext();
    const toast = useSkyToast();
    const [loading, setLoading] = React.useState(false);
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);
    const tacToeGameRetryWrite = useBttGameRetry(bidTacToeGameAddress);

    const handleRetreat = async () => {
        try {
            setLoading(true);
            const privateLobbySigner = getPrivateLobbySigner();
            if (loading) return;
            if (quitType === "wait") {
                const privateLobbySigner = getPrivateLobbySigner();
                await bttPrivateLobbyContract(
                    "deleteRoom",
                    [bidTacToeGameAddress],
                    {
                        usePaymaster: true,
                        signer: privateLobbySigner,
                    },
                );
                navigate(`/btt/lobby?lobbyAddress=${lobbyAddress}`);
            } else {
                await tacToeGameRetryWrite("surrender", [], {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                });
            }

            setLoading(false);
            onClose();
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast(handleError(error, true));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                bg="rgba(255, 255, 255, 0.7)"
                border="3px solid #FDDC2D"
                borderRadius="8px"
                sx={{
                    width: "90%",
                    maxWidth: "500px",
                }}
            >
                <Img
                    pos="absolute"
                    top="4px"
                    right="4px"
                    w="20px"
                    src={CloseIcon}
                    cursor="pointer"
                    onClick={() => onClose()}
                />
                <ModalBody
                    pb="0"
                    sx={{
                        width: "340px",
                    }}
                >
                    <Text
                        color="black"
                        fontSize="20px"
                        fontWeight="600"
                        fontFamily={"Orbitron"}
                        textAlign={"center"}
                    >
                        Are you sure you want to quit?
                    </Text>
                    {loading && <Loading size={50}></Loading>}
                </ModalBody>

                <ModalFooter display="flex" justifyContent="space-between">
                    <Button
                        bg="white"
                        colorScheme="white"
                        onClick={handleRetreat}
                        fontSize="16px"
                        w="135px"
                        borderRadius="8px"
                        fontWeight={400}
                        height={"40px"}
                    >
                        Quit
                    </Button>
                    <Button
                        colorScheme="yellow"
                        onClick={onClose}
                        fontSize="16px"
                        w="135px"
                        height={"40px"}
                        borderRadius="8px"
                        fontWeight={400}
                    >
                        Continue to {quitType}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default QuitModal;
