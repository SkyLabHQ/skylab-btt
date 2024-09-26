import Back from "@/components/Back";
import RuleWrap from "@/components/Introduce/RuleWrap";
import { Toolbar } from "@/components/Tower/Toolbar";
import { Box } from "@chakra-ui/react";
import React from "react";

const League = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "24px",
                    top: "24px",
                }}
            >
                <Back></Back>
            </Box>
            <Toolbar showLeague={false}></Toolbar>
            <Box
                sx={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    width: "100%",
                }}
            ></Box>
        </Box>
    );
};

export default League;
