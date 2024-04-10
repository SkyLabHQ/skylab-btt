import { Box, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import UserInfoDrawer from "@/components/UserInfoDrawer";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import axios from "axios";

const UserInfoContext = createContext<{
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
    activePilot: PilotInfo;
    handleGetActivePilot: () => void;
    pilotIsInit: boolean;
    blockOpen: boolean;
    isBlock: boolean;
    handleBlock: (block: boolean) => void;
}>(null);

export const UserInfoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { address } = usePrivyAccounts();
    const { activePilot, handleGetActivePilot, init } = usePilotInfo(address);
    const [isBlock, setIsBlock] = useState(false);
    const [blockOpen, setIsBlockOpen] = useState(false);

    const handleBlock = (block: boolean) => {
        setIsBlockOpen(block);
    };

    useEffect(() => {
        axios.get("https://ipapi.co/json/").then(async (res: any) => {
            if (res.data.country_code === "US") {
                setIsBlock(true);
                setIsBlockOpen(true);
            } else {
                setIsBlock(false);
                setIsBlockOpen(false);
            }
        });
    }, []);

    return (
        <UserInfoContext.Provider
            value={{
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
                activePilot,
                handleGetActivePilot,
                pilotIsInit: init,
                blockOpen,
                isBlock,
                handleBlock,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                {children}
                <UserInfoDrawer
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
