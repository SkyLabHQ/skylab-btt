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
    useMediaQuery,
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                <ModalBody pb="0">
                    <Text
                        color="black"
                        fontSize={isPc ? "24px" : "20px"}
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
                    padding={"10px"}
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    <Button
                        bg="white"
                        colorScheme="white"
                        onClick={handleConfirm}
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
