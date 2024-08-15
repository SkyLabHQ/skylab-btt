import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const BidIconContext = createContext<{
    bidIconType: string;
    handleToggleType: () => void;
}>(null);

export const BidIconProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [bidIconType, setBidIconType] = useState("0");

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
    }, []);

    return (
        <BidIconContext.Provider
            value={{
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
            </Box>
        </BidIconContext.Provider>
    );
};

export const useBidIconContext = () => {
    return useContext(BidIconContext);
};
