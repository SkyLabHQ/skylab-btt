import React from "react";
import {
    Text,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    ModalCloseButton,
    useMediaQuery,
} from "@chakra-ui/react";

const PreviousLobbyModal = ({
    lobbyName,
    isOpen,
    onClose,
    onConfirm,
}: {
    lobbyName: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                bg="#383838"
                border={isPc ? "3px solid #fff" : "1px solid #fff"}
                borderRadius={isPc ? "1.0417vw" : "8px"}
                sx={{
                    width: isPc ? "31.25vw" : "350px",
                    maxWidth: isPc && "31.25vw",
                }}
            >
                <ModalCloseButton></ModalCloseButton>
                <ModalBody
                    pb="0"
                    pt="1.875vw"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text
                        fontSize={isPc ? "1.25vw" : "20px"}
                        sx={{
                            marginTop: "1.0417vw",
                        }}
                    >
                        You were previously in
                    </Text>
                    <Text
                        fontSize={isPc ? "1.25vw" : "20px"}
                        sx={{
                            marginTop: "1.0417vw",
                            color: "#FDDC2D",
                        }}
                    >
                        Lobby {lobbyName}
                    </Text>
                    <Text
                        fontSize={isPc ? "1.25vw" : "20px"}
                        sx={{
                            marginTop: "1.0417vw",
                        }}
                    >
                        Do you want to re-join
                    </Text>
                </ModalBody>

                <ModalFooter
                    display="flex"
                    justifyContent="space-between"
                    pt="2.6042vw"
                >
                    <Button
                        onClick={onConfirm}
                        fontSize={isPc ? "1.25vw" : "20px"}
                        w={isPc ? "10.9375vw" : "120px"}
                        padding="1.6667vw 0"
                        borderRadius={isPc ? "1.0417vw" : "8px"}
                        fontWeight={400}
                        height={isPc ? "3vw" : "32px"}
                    >
                        Yes
                    </Button>
                    <Button
                        colorScheme="white"
                        onClick={onClose}
                        fontSize={isPc ? "1.25vw" : "20px"}
                        w={isPc ? "10.9375vw" : "120px"}
                        height={isPc ? "3vw" : "32px"}
                        padding="1.6667vw 0"
                        borderRadius={isPc ? "1.0417vw" : "8px"}
                        fontWeight={400}
                        variant={"outline"}
                    >
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PreviousLobbyModal;
