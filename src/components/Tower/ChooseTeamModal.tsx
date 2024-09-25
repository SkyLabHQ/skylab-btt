import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import React from "react";

const ChooseTeamModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay />
            <ModalContent
                bg="rgba(255, 255, 255, 0.7)"
                border="3px solid #FDDC2D"
                borderRadius="8px"
            >
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
export default ChooseTeamModal;
