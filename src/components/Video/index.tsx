import loadVideo from "@/utils/loadVideo";
import { useEffect, useRef, useState } from "react";

const VideoComponent = ({
    url,
    style,
}: {
    url: string;
    style?: React.CSSProperties;
}) => {
    const videoRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState("");

    useEffect(() => {
        const setVideoSource = async () => {
            try {
                const videoURL = await loadVideo(url);
                setVideoSrc(videoURL);
            } catch (err) {
                console.error("Error loading video:", err);
            }
        };

        setVideoSource();
    }, [url]);

    return (
        <video
            ref={videoRef}
            src={videoSrc}
            muted
            autoPlay
            style={style}
            loop={true}
        />
    );
};

export default VideoComponent;
