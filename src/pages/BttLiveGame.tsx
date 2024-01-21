import BttHelmet from "@/components/Helmet/BttHelmet";
import BttLiveGamePage from "@/components/TacToe/BttLiveGamePage";
import React, { useEffect } from "react";

const BttLiveGame = () => {
    return (
        <>
            <BttHelmet></BttHelmet>
            <BttLiveGamePage></BttLiveGamePage>
        </>
    );
};

export default BttLiveGame;
