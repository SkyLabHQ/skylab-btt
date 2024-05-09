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
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay />
            <ModalContent
                bg="#383838"
                border={isPc ? "3px solid #fff" : "1px solid #fff"}
                borderRadius={isPc ? "20px" : "12px"}
                sx={{
                    width: isPc ? "600px" : "350px",
                    maxWidth: isPc && "600px",
                }}
            >
                <ModalCloseButton></ModalCloseButton>
                <ModalBody
                    pb="0"
                    pt="36px"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text
                        fontSize={isPc ? "24px" : "20px"}
                        sx={{
                            marginTop: isPc ? "20px" : "10px",
                        }}
                    >
                        You were previously in
                    </Text>
                    <Text
                        fontSize={isPc ? "24px" : "20px"}
                        sx={{
                            marginTop: isPc ? "20px" : "10px",
                            color: "#FDDC2D",
                        }}
                    >
                        Lobby {lobbyName}
                    </Text>
                    <Text
                        fontSize={isPc ? "24px" : "20px"}
                        sx={{
                            marginTop: isPc ? "20px" : "10px",
                        }}
                    >
                        Do you want to re-join
                    </Text>
                </ModalBody>

                <ModalFooter
                    display="flex"
                    justifyContent="space-between"
                    pt={isPc ? "50px" : "20px"}
                >
                    <Button
                        onClick={onConfirm}
                        fontSize={isPc ? "24px" : "20px"}
                        w={isPc ? "210px" : "120px"}
                        padding={isPc ? "32px 0" : "20px 0"}
                        borderRadius={isPc ? "20px" : "8px"}
                        fontWeight={400}
                        height={isPc ? "56px" : "32px"}
                    >
                        Yes
                    </Button>
                    <Button
                        colorScheme="white"
                        onClick={onClose}
                        fontSize={isPc ? "24px" : "20px"}
                        w={isPc ? "210px" : "120px"}
                        height={isPc ? "56px" : "32px"}
                        padding={isPc ? "32px 0" : "20px 0"}
                        borderRadius={isPc ? "20px" : "8px"}
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
