import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";

const UserInfoContext = createContext<{
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
}>(null);

export const UserInfoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState("right");

    return (
        <UserInfoContext.Provider
            value={{
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                {children}

                <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">
                            Basic Drawer
                        </DrawerHeader>
                        <DrawerBody>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </UserInfoContext.Provider>
    );
};

export const useUserInfoRequest = () => {
    return useContext(UserInfoContext);
};
