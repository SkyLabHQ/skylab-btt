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
import Loading from "../Loading";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";

const QuitModal = ({
    onConfirm,
    quitType,
    isOpen,
    onClose,
}: {
    onConfirm: () => void;
    quitType: "wait" | "game";
    isOpen: boolean;
    onClose: () => void;
}) => {
    const toast = useSkyToast();
    const [loading, setLoading] = React.useState(false);

    const handleConfirm = async () => {
        if (loading) return;

        try {
            setLoading(true);
            await onConfirm();
            setLoading(false);
            onClose();
        } catch (e) {
            console.log(e);
            toast(handleError(e, true));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                bg="rgba(255, 255, 255, 0.7)"
                border="3px solid #FDDC2D"
                borderRadius="1.0417vw"
                sx={{
                    width: "31.25vw",
                    maxWidth: "31.25vw",
                }}
            >
                <Img
                    pos="absolute"
                    top="0.8333vw"
                    right="0.8333vw"
                    w="1.6667vw"
                    src={CloseIcon}
                    cursor="pointer"
                    onClick={() => onClose()}
                />
                <ModalBody
                    pb="0"
                    pt="1.875vw"
                    sx={{
                        width: "31.25vw",
                    }}
                >
                    <Text
                        color="black"
                        fontSize="1.4583vw"
                        fontWeight="600"
                        fontFamily={"Orbitron"}
                        textAlign={"center"}
                    >
                        Are you sure you want to quit?
                    </Text>
                    {loading && <Loading size={50}></Loading>}
                </ModalBody>

                <ModalFooter
                    display="flex"
                    justifyContent="space-between"
                    pt="2.6042vw"
                >
                    <Button
                        bg="white"
                        colorScheme="white"
                        onClick={handleConfirm}
                        fontSize="1.25vw"
                        w="10.9375vw"
                        padding="1.6667vw 0"
                        borderRadius="1.0417vw"
                        fontWeight={400}
                        height={"3vw"}
                    >
                        Quit
                    </Button>
                    <Button
                        colorScheme="yellow"
                        onClick={onClose}
                        fontSize="1.25vw"
                        w="10.9375vw"
                        height={"3vw"}
                        padding="1.6667vw 0"
                        borderRadius="1.0417vw"
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
