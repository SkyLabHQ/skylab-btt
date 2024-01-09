import "swiper/css/bundle";

import { Box } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { Outlet } from "react-router-dom";

const App = ({ children }: React.PropsWithChildren<unknown>): ReactElement => {
    return (
        // TO-DO: use color mode when implementing light/dark
        <Box minH="100%" bg="black" color="white" height={"100%"}>
            {children}
            <Outlet />
        </Box>
    );
};

export default App;
