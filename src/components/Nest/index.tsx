import React from "react";
import ReactCanvasNest from "react-canvas-nest";
import "./index.css";

const Nest = () => {
    return (
        <ReactCanvasNest
            className="canvasNest"
            style={{}}
            config={{
                count: 66,
                pointColor: " 255, 255, 255 ",
                lineColor: "255,255,255",
                dist: 1500,
            }}
        />
    );
};

export default Nest;
