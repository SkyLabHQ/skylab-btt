import { Box, Flex, Image, useDisclosure, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RArrowIcon from "./assets/r-arrow.svg";
import WB from "./assets/w-b.png";
import Paper from "./assets/paper.png";
import PrizeMoney from "./PrizeMoney";
import BtButton from "./BtButton";
import { Toolbar } from "./Toolbar";
import ChooseTeamModal from "./ChooseTeamModal";
import AllAviation from "./AllAviation";
import Warning from "./Warning";
import Status from "./Status";
import ChoosePlane from "./ChoosePlane";
import {
    useMultiLeagueTournamentContract,
    useMultiPointContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { useLeagueTournamentContract } from "@/hooks/useContract";
const Tower = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isChoosePlaneOpen,
        onOpen: onChoosePlaneOpen,
        onClose: onChoosePlaneClose,
    } = useDisclosure();
    const chainId = useChainId();

    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);

    const handleInit = async () => {
        // console.log(leagueTournamentContract.read, "leagueTournamentContract");
        // const res1 = await leagueTournamentContract.read.getnewComerInfo([]);
        // console.log(res1);
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiLeagueTournamentContract.getnewComerInfo(i));
        }

        const res = await multiProvider.all(p);
        console.log(res);
        console.log("init");
    };

    useEffect(() => {
        if (!multiProvider || !multiLeagueTournamentContract) return;
        handleInit();
    }, [multiProvider, multiLeagueTournamentContract]);

    return (
        <Flex
            sx={{
                position: "relative",
                height: "100%",
                padding: "0 20px",
            }}
            flexDir={"column"}
            justify={"center"}
        >
            <PrizeMoney></PrizeMoney>
            <Toolbar></Toolbar>
            <Status></Status>
            <AllAviation></AllAviation>
            <BtButton
                onAvaitionClick={onOpen}
                onPlayClick={onChoosePlaneOpen}
            ></BtButton>
            <Warning></Warning>
            <ChooseTeamModal
                isOpen={isOpen}
                onClose={onClose}
            ></ChooseTeamModal>
            <ChoosePlane
                isOpen={isChoosePlaneOpen}
                onClose={onChoosePlaneClose}
            ></ChoosePlane>
        </Flex>
    );
};

export default Tower;
