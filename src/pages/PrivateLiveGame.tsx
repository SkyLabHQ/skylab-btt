import BttHelmet from "@/components/Helmet/BttHelmet";
import Nest from "@/components/Nest";
import PrivateLivePage from "@/components/PrivateLive";
import { Box } from "@chakra-ui/react";
import React from "react";
import ReactCanvasNest from "react-canvas-nest";
const PrivateLiveGame = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <PrivateLivePage></PrivateLivePage>
            <Nest />
        </Box>
    );
};

export default PrivateLiveGame;
