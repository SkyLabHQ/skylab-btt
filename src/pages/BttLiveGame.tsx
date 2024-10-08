import Nest from "@/components/Nest";
import BttLiveGamePage from "@/components/TacToe/BttLiveGamePage";
import { Box } from "@chakra-ui/react";
import React from "react";

const BttLiveGame = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttLiveGamePage></BttLiveGamePage>
            <Nest />
        </Box>
    );
};

export default BttLiveGame;
