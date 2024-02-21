import BttHelmet from "@/components/Helmet/BttHelmet";
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
            <ReactCanvasNest
                className="canvasNest"
                config={{
                    count: 66,
                    pointColor: " 255, 255, 255 ",
                    lineColor: "255,255,255",
                }}
            />
        </Box>
    );
};

export default PrivateLiveGame;
