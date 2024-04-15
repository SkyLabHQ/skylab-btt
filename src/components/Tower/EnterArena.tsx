import ArenaIcon from "./assets/arena-icon.png";
import { Image, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Click1Wav from "@/assets/click1.wav";
const audio = new Audio(Click1Wav);
const EnterArena = () => {
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const handleClick = () => {
        audio.play();
        navigate("/");
    };
    return (
        <Image
            src={ArenaIcon}
            onClick={handleClick}
            sx={{
                width: isPc ? "313px" : "110px",
                position: "fixed",
                right: "0",
                bottom: "0",
                cursor: "pointer",
            }}
        ></Image>
    );
};

export default EnterArena;
