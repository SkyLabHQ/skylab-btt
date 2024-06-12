import { Box } from "@chakra-ui/react";
import PvpHomePage from "@/components/PvpHomePage";
import Nest from "@/components/Nest";

const PvpHome = () => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <PvpHomePage></PvpHomePage>
            <Nest />
        </Box>
    );
};
export default PvpHome;
