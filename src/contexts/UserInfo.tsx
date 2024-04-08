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
    isBlock: boolean;
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

    useEffect(() => {
        axios.get("https://ipapi.co/json/").then(async (res: any) => {
            console.log(res.data);
            if (res.data.country_code === "US") {
                setIsBlock(true);
            } else {
                setIsBlock(false);
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
                isBlock,
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
