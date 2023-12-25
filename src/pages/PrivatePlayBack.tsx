import BttHelmet from "@/components/Helmet/BttHelmet";
import PrivatePlayBackPage from "@/components/PrivatePlayBack";
import { useKnobVisibility } from "@/contexts/KnobVisibilityContext";
import React, { useEffect } from "react";

const PrivatePlayBack = () => {
    const { setIsKnobVisible } = useKnobVisibility();

    useEffect(() => {
        setIsKnobVisible(false);
        return () => setIsKnobVisible(true);
    }, []);

    return (
        <>
            <BttHelmet></BttHelmet>
            <PrivatePlayBackPage></PrivatePlayBackPage>
        </>
    );
};

export default PrivatePlayBack;
