import { Box, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect } from "react";
import UserInfoDrawer from "@/components/UserInfoDrawer";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

const UserInfoContext = createContext<{
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
    activePilot: PilotInfo;
    handleGetActivePilot: () => void;
    pilotIsInit: boolean;
}>(null);

export const UserInfoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { address } = usePrivyAccounts();
    const { activePilot, handleGetActivePilot, init } = usePilotInfo(address);

    return (
        <UserInfoContext.Provider
            value={{
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
                activePilot,
                handleGetActivePilot,
                pilotIsInit: init,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                {children}
                <UserInfoDrawer
                    activePilot={activePilot}
                    isOpen={isOpen}
                    onClose={onClose}
                ></UserInfoDrawer>
            </Box>
        </UserInfoContext.Provider>
    );
};

export const useUserInfoRequest = () => {
    return useContext(UserInfoContext);
};
