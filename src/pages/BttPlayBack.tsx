import BttHelmet from "@/components/Helmet/BttHelmet";
import BttPlayBackPage from "@/components/BttPlayBack";
import React from "react";
import { Box } from "@chakra-ui/react";
import Nest from "@/components/Nest";

const BttPlayBack = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <BttPlayBackPage></BttPlayBackPage>
            <Nest />
        </Box>
    );
};

export default BttPlayBack;
