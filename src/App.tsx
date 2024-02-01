import "swiper/css/bundle";

import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useSkyToast from "./hooks/useSkyToast";
import Service from "./pages/Service";
import AddToHome from "./pages/AddToHome";

const App = (): ReactElement => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [type, setType] = useState(-1);
    const toast = useSkyToast();
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleEnter = () => {
        if (checked) {
            localStorage.setItem("service", "true");
            setType(0);
            navigate("/");
        } else {
            toast("Please agree to the Terms of Service.");
        }
    };

    useEffect(() => {
        const agree = localStorage.getItem("service");

        if (isPc) {
            setType(0);
            return;
        }

        // 手机浏览器模式
        if (!window.matchMedia("(display-mode: standalone)").matches && !isPc) {
            setType(2);
            return;
        }

        //手机pwa模式  且同意service
        if (
            window.matchMedia("(display-mode: standalone)").matches &&
            agree === "true" &&
            !isPc
        ) {
            setType(0);
            return;
        }

        //手机pwa模式  不同意service
        if (
            window.matchMedia("(display-mode: standalone)").matches &&
            !agree &&
            !isPc
        ) {
            setType(1);
            return;
        }
    }, [isPc]);

    return (
        // TO-DO: use color mode when implementing light/dark
        <Box minH="100%" color="white" height={"100%"}>
            {<Outlet />}
            {/* {type === 1 && (
                <Service
                    checked={checked}
                    onChecked={setChecked}
                    onEnter={handleEnter}
                ></Service>
            )}
            {type === 2 && <AddToHome></AddToHome>} */}
        </Box>
    );
};

export default App;
