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
    bidIconType: string;
    handleBlock: (block: boolean) => void;
    handleToggleType: () => void;
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
    const [bidIconType, setBidIconType] = useState("0");

    const handleBlock = (block: boolean) => {
        setIsBlockOpen(block);
    };

    const handleToggleType = () => {
        if (bidIconType === "0") {
            setBidIconType("1");
            localStorage.setItem("bidIconType", "1");
        } else {
            setBidIconType("0");
            localStorage.setItem("bidIconType", "0");
        }
    };

    useEffect(() => {
        const _bidIconType = localStorage.getItem("bidIconType");
        if (_bidIconType && bidIconType !== _bidIconType) {
            setBidIconType("1");
        }

        axios.get("https://ipapi.co/json/").then(async (res: any) => {
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
                blockOpen,
                isBlock,
                handleBlock,
                bidIconType,
                handleToggleType,
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

export const useUserInfo = () => {
    return useContext(UserInfoContext);
};
