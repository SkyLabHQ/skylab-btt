import BttHelmet from "@/components/Helmet/BttHelmet";
import PrivateLivePage from "@/components/PrivateLive";
import { useKnobVisibility } from "@/contexts/KnobVisibilityContext";
import React, { useEffect } from "react";

const PrivateLiveGame = () => {
    const { setIsKnobVisible } = useKnobVisibility();

    useEffect(() => {
        setIsKnobVisible(false);
        return () => setIsKnobVisible(true);
    }, []);

    return (
        <>
            <BttHelmet></BttHelmet>
            <PrivateLivePage></PrivateLivePage>
        </>
    );
};

export default PrivateLiveGame;
