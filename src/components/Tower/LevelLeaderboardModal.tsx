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
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useSubmitRequest } from "@/contexts/SubmitRequest";

const LevelLeaderboardModal = ({
    list,
    isOpen,
    onClose,
}: {
    list: any[];
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            </ModalContent>
        </Modal>
    );
};

export default LevelLeaderboardModal;
