import React, { useEffect, useRef } from "react";
import TestIcon from "@/assets/btt-icon.png";
import { Box } from "@chakra-ui/react";

const Chart = () => {
    const chartRef = useRef(null);

    const dataPoints = [
        { x: 450, y: 30, level: 16 },
        { x: 700, y: 100 },
        { x: 950, y: 180 },
        { x: 1200, y: 300 },
        { x: 1000, y: 380 },
        { x: 800, y: 440 },
        { x: 550, y: 490 },
        { x: 200, y: 520 },
    ];

    useEffect(() => {
        const chartContainer = chartRef.current;

        // 连接数据点之间的折线
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
        );

        const maxHeight = dataPoints.reduce(
            // 获取最大高度
            (max, point) => (point.y > max ? point.y : max),
            0,
        );
        line.setAttribute("width", "1200"); // 设置 SVG 宽度为 1200
        line.setAttribute("height", String(maxHeight)); // 设置 SVG 高度为 "auto"

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );
        path.setAttribute(
            "d",
            `M${dataPoints.map((point) => `${point.x},${point.y}`).join("L")}`,
        );
        path.setAttribute("stroke", "#3498db");
        path.setAttribute("fill", "none");
        line.appendChild(path);
        chartContainer.appendChild(line);

        // 创建数据点的 div 元素，每个拐角放一个包含图片的 div
        dataPoints.forEach((point, index) => {
            const dataPointDiv = document.createElement("div");
            dataPointDiv.className = "data-point";

            // 设置 div 的位置和居中
            dataPointDiv.style.position = "absolute";
            dataPointDiv.style.left = `${point.x}px`;
            dataPointDiv.style.top = `${point.y}px`;
            dataPointDiv.style.transform = "translate(-50%, -50%)"; // 居中
            dataPointDiv.style.width = "124px"; // 设置 z-index 以便图片显示在折线上方

            // 创建图片元素并设置图片地址
            const image = new Image();
            image.src = TestIcon;
            image.alt = `Point ${index + 1}`;
            image.style.width = "124px"; // 设置图片宽度，根据实际需要调整
            image.style.height = "124px"; // 设置图片高度，根据实际需要调整

            dataPointDiv.appendChild(image);

            chartContainer.appendChild(dataPointDiv);
        });
    }, []); // 仅在组件加载时运行一次

    return (
        <Box>
            <div
                style={{
                    position: "relative",
                    width: "1200px",
                    height: "auto",
                }}
                ref={chartRef}
            ></div>
        </Box>
    );
};

export default Chart;
