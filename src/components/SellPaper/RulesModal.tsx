import {
    Box,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const RulesModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                containerProps={{
                    sx: {
                        "&:focus-visible": {
                            outline: "none",
                        },
                    },
                }}
            >
                <ModalBody
                    sx={{
                        backdropFilter: "blur(33.97852325439453px)",
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "1px solid #f2d861",
                        borderRadius: "24px",
                        overflow: "hidden",
                    }}
                >
                    <Box>111</Box>{" "}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default RulesModal;
