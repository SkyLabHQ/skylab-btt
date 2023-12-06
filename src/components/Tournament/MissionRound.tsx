import { Box } from "@chakra-ui/react";
import { useState } from "react";
import PlanetList from "./PlanetList";
import RightNav from "./RightNav";
import Header from "./Header";

interface ChildProps {
    onNextRound: (step: number | string) => void;
}

const MissionRound = ({ onNextRound }: ChildProps) => {
    const [active, setActive] = useState(1);
    const [showAllActivities, setShowAllActivities] = useState(false);

    return (
        <Box
            h={"100vh"}
            w={"100vw"}
            sx={{ color: "#000", fontWeight: 600 }}
            onClick={() => {}}
        >
            <Header onNextRound={onNextRound}></Header>
            <PlanetList
                active={active}
                showAllActivities={showAllActivities}
                onChangeActive={(index) => {
                    setActive(index);
                }}
                onChangeAllActivities={(flag) => {
                    setShowAllActivities(flag);
                }}
            ></PlanetList>
            <RightNav onNextRound={onNextRound}></RightNav>
        </Box>
    );
};

export default MissionRound;
