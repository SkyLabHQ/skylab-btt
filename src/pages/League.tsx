import Back from "@/components/Back";
import RuleWrap from "@/components/Introduce/RuleWrap";
import { Toolbar } from "@/components/Tower/Toolbar";
import { Box, Flex, Text, Image, color, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DataInfo from "@/components/League/DataInfo";
import TeamPlaneList from "@/components/League/TeamPlaneList";
import leagueConfigList from "@/utils/league";
import LeaderRateModal from "@/components/League/LeaderRateModal";
import SelectTeam from "@/components/League/SelectTeam";

const League = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const navigate = useNavigate();
    const {
        isOpen: isLeaderRateModalOpen,
        onOpen: onLeaderRateModalOpen,
        onClose: onLeaderRateModalClose,
    } = useDisclosure();

    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                paddingTop: "100px",
            }}
            flexDirection={"column"}
            align={"center"}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "24px",
                    top: "24px",
                }}
            >
                <Back
                    onClick={() => {
                        navigate("/tower");
                    }}
                ></Back>
            </Box>
            <Toolbar showLeague={false}></Toolbar>
            <SelectTeam
                activeIndex={activeIndex}
                onActiveIndex={handleActiveIndex}
            ></SelectTeam>
            <DataInfo></DataInfo>
            <TeamPlaneList
                onLeaderRateModalOpen={onLeaderRateModalOpen}
            ></TeamPlaneList>
            <LeaderRateModal
                isOpen={isLeaderRateModalOpen}
                onClose={onLeaderRateModalClose}
            ></LeaderRateModal>
        </Flex>
    );
};

export default League;
