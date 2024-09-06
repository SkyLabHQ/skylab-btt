import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TournamentHelmet = () => {
    useEffect(() => {
        const link: any =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = "/tournament.png";
        document.getElementsByTagName("head")[0].appendChild(link);
    }, []);

    return (
        <Helmet>
            <title>The War of Influence Game</title>
            <meta
                name="description"
                content="a massive multiplayer, on-chain social game. Join teams, play games, and be the Last Plane when timer counts to zero. Only one team will win. "
            />
        </Helmet>
    );
};

export default TournamentHelmet;
