import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { aviationImg } from "@/utils/aviationImg";

const Card = () => {
    return (
        <Box>
            <Box>
                <Image src={aviationImg(1)}></Image>
            </Box>
        </Box>
    );
};

export default Card;
