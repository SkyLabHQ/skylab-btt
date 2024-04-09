import { countDownTime } from "@/skyConstants";
import { useEffect } from "react";
import useCountDown from "react-countdown-hook";

const useStartGame = () => {
    const [timeLeft, { start }] = useCountDown(countDownTime, 1000);

    useEffect(() => {
        start();
    }, []);

    return { timeLeft };
};

export default useStartGame;
