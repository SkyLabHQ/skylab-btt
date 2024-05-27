import BttHelmet from "@/components/Helmet/BttHelmet";
import PrivatePlayBackPage from "@/components/PrivatePlayBack";
import { Box } from "@chakra-ui/react";
import React from "react";
import Nest from "@/components/Nest";

const PrivatePlayBack = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <PrivatePlayBackPage></PrivatePlayBackPage>
            <Nest />
        </Box>
    );
};

export default PrivatePlayBack;
