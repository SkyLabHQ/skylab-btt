import BttHelmet from "@/components/Helmet/BttHelmet";
import BttPlayBackPage from "@/components/BttPlayBack";
import React from "react";
import ReactCanvasNest from "react-canvas-nest";
import { Box } from "@chakra-ui/react";

const BttPlayBack = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <BttPlayBackPage></BttPlayBackPage>
            <ReactCanvasNest
                className="canvasNest"
                config={{
                    count: 66,
                    pointColor: " 255, 255, 255 ",
                    lineColor: "255,255,255",
                    dist: 1500,
                }}
            />
        </Box>
    );
};

export default BttPlayBack;
