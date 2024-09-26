import Nest from "@/components/Nest";
import Tower from "@/components/Tower";
import { Box } from "@chakra-ui/react";
import React from "react";

const TowerPage = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <Tower></Tower>
            <Nest />
        </Box>
    );
};
export default TowerPage;
