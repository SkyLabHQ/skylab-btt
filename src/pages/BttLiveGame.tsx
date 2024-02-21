import BttHelmet from "@/components/Helmet/BttHelmet";
import BttLiveGamePage from "@/components/TacToe/BttLiveGamePage";
import { Box } from "@chakra-ui/react";
import React from "react";
import ReactCanvasNest from "react-canvas-nest";

const BttLiveGame = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <BttLiveGamePage></BttLiveGamePage>
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

export default BttLiveGame;
