import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const BttHelmet = () => {
    useEffect(() => {
        const link: any =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = "/btt-icon.png";
        document.getElementsByTagName("head")[0].appendChild(link);
    }, []);

    return (
        <Helmet>
            <title>Bid Tac Toe</title>
            <meta
                name="description"
                content="Bid Tac Toe is a fully on-chain variant of the game tic-tac-toe. Each player starts with 100 units of gold. Players simultaneously one-shot blind bid gold for selected grid in order to claim the selected grid. The player who has occupied three-in-a-line grids or at least 5/9 grids wins. Bid tac toe is fully on-chain, fully open-sourced, and developed by Sky Lab. Available on both mobile and PC, with wallet-free and gas-free on-boarding. "
            />
        </Helmet>
    );
};

export default BttHelmet;
