import { Box } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

const Market = () => {
    const [list, setList] = React.useState([
        {
            price: `$100`,
            title: `title`,
        },
    ]);

    return (
        <Box sx={{}}>
            {list.map((item, index) => {
                return (
                    <Box key={index} sx={{ width: "20%", maxWidth: "320px" }}>
                        <Card></Card>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Market;
