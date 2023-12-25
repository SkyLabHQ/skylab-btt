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
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                bg="#383838"
                border="3px solid #fff"
                borderRadius="1.0417vw"
                sx={{
                    width: "31.25vw",
                    maxWidth: "31.25vw",
                }}
            >
                <ModalCloseButton></ModalCloseButton>
                <ModalBody
                    pb="0"
                    pt="1.875vw"
                    sx={{
                        width: "31.25vw",
                        textAlign: "center",
                    }}
                >
                    <Text
                        fontSize="24px"
                        sx={{
                            marginTop: "1.0417vw",
                        }}
                    >
                        You were previously in
                    </Text>
                    <Text
                        fontSize="24px"
                        sx={{
                            marginTop: "1.0417vw",
                            color: "#FDDC2D",
                        }}
                    >
                        Lobby {lobbyName}
                    </Text>
                    <Text
                        fontSize="24px"
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
                        fontSize="1.25vw"
                        w="10.9375vw"
                        padding="1.6667vw 0"
                        borderRadius="1.0417vw"
                        fontWeight={400}
                        height={"3vw"}
                    >
                        Yes
                    </Button>
                    <Button
                        colorScheme="white"
                        onClick={onClose}
                        fontSize="1.25vw"
                        w="10.9375vw"
                        height={"3vw"}
                        padding="1.6667vw 0"
                        borderRadius="1.0417vw"
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
