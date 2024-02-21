import BttHelmet from "@/components/Helmet/BttHelmet";
import PrivatePlayBackPage from "@/components/PrivatePlayBack";
import { Box } from "@chakra-ui/react";
import ReactCanvasNest from "react-canvas-nest";
import React from "react";

const PrivatePlayBack = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <PrivatePlayBackPage></PrivatePlayBackPage>
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

export default PrivatePlayBack;
