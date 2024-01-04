import "swiper/css/bundle";

import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const App = ({ children }: React.PropsWithChildren<unknown>): ReactElement => {
    return (
        // TO-DO: use color mode when implementing light/dark
        <Box minH="100vh" bg="black" color="white">
            {children}
            <Outlet />
        </Box>
    );
};

export default App;
