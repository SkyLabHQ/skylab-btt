import { Box, useMediaQuery } from "@chakra-ui/react";
import ReactCanvasNest from "react-canvas-nest";

const Nest = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                height: "100%",
                zIndex: -1,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: isPc && "none",
                    zIndex: -1,
                }}
            >
                <ReactCanvasNest
                    className="canvasNest"
                    config={{
                        count: 40,
                        pointColor: " 255, 255, 255 ",
                        dist: 2000,
                        lineColor: "255,255,255",
                        lineWidth: 2,
                        mouseDist: 10000,
                    }}
                />
            </Box>
            <Box
                sx={{
                    height: "100%",
                    display: !isPc && "none",
                    zIndex: -1,
                }}
            >
                <ReactCanvasNest
                    className="canvasNest"
                    config={{
                        pointColor: " 255, 255, 255 ",
                        dist: 2000,
                        lineColor: "255,255,255",
                        lineWidth: 2,
                        mouseDist: 10000,
                    }}
                />
            </Box>
        </Box>
    );
};

export default Nest;
