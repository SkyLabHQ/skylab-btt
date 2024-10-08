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
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

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
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();

    const handleConfirm = async () => {
        try {
            onConfirm();
            onClose();
        } catch (e) {
            onClose();
            console.log(e);
            toast(handleError(e, true));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay />
            <ModalContent
                bg="rgba(255, 255, 255, 0.7)"
                border="3px solid #FDDC2D"
                borderRadius="8px"
                sx={{
                    width: isPc ? "350px" : "300px",
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
                <ModalBody pb="0" pt={"20px"}>
                    <Text
                        color="black"
                        fontSize={isPc ? "24px" : "20px"}
                        fontWeight="700"
                        fontFamily={"Orbitron"}
                        textAlign={"center"}
                    >
                        Are you sure
                    </Text>
                    <Text
                        color="black"
                        fontSize={isPc ? "24px" : "20px"}
                        fontWeight="700"
                        fontFamily={"Orbitron"}
                        textAlign={"center"}
                    >
                        you want to quit?
                    </Text>
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
                        fontSize={isPc ? "16px" : "14px"}
                        w={isPc ? "150px" : "130px"}
                        borderRadius="8px"
                        fontWeight={400}
                        height={"40px"}
                    >
                        Quit
                    </Button>
                    <Button
                        onClick={onClose}
                        fontSize={isPc ? "16px" : "14px"}
                        w={isPc ? "150px" : "130px"}
                        height={"40px"}
                        borderRadius="8px"
                        fontWeight={400}
                        background={"#FDDC2D"}
                        color={"#000"}
                    >
                        Continue to {quitType}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default QuitModal;
