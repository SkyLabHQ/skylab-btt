import { Box } from "@chakra-ui/react";
import React from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import SoloPage from "@/components/Solo";

const Solo = () => {
    return (
        <SDKProvider acceptCustomStyles debug>
            <div>My application!</div>
            <SoloPage></SoloPage>
        </SDKProvider>
    );
};
export default Solo;
