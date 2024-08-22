import BttPlayBackPage from "@/components/BttPlayBack";
import { Box } from "@chakra-ui/react";
import Nest from "@/components/Nest";

const BttPlayBack = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttPlayBackPage></BttPlayBackPage>
            <Nest />
        </Box>
    );
};

export default BttPlayBack;
