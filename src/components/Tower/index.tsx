import { Box, Flex, Image, useDisclosure, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { useLeagueTournamentContract } from "@/hooks/useContract";
import { ZERO_DATA } from "@/skyConstants";
import { useUserInfo } from "@/contexts/UserInfo";

export interface Newcomer {
    claimTIme: number;
    newComerId: number;
    owner: string;
    point: number;
    leader: string;
}

const getInitNewcomerList = () => {
    const list: Newcomer[] = [];
    for (let i = 0; i < 16; i++) {
        list.push({
            claimTIme: 0,
            newComerId: 0,
            owner: ZERO_DATA,
            point: 0,
            leader: ZERO_DATA,
        });
    }
    return list;
};

const Tower = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isChoosePlaneOpen,
        onOpen: onChoosePlaneOpen,
        onClose: onChoosePlaneClose,
    } = useDisclosure();
    const chainId = useChainId();
    const [newcomerList, setNewcomerList] = useState<Newcomer[]>(
        getInitNewcomerList(),
    );
    const { address } = useUserInfo();
    const [pot, setPot] = useState("");

    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);

    const handleInit = async () => {
        const p = [];
        p.push(multiLeagueTournamentContract.pot());
        for (let i = 1; i <= 16; i++) {
            p.push(multiLeagueTournamentContract.getnewComerInfo(i));
        }

        const [pot, ...res] = await multiProvider.all(p);

        console.log(pot, "pot");

        setPot(pot.toString());
        const list: Newcomer[] = [];
        res.forEach((item) => {
            list.push({
                claimTIme: item[0].toNumber(),
                newComerId: item[1].toNumber(),
                owner: item[2],
                point: item[3].toNumber(),
                leader: item[4],
            });
        });

        setNewcomerList(list);
        console.log(res);
        console.log("init");
    };

    const handleGetMyPlane = async () => {
        const [planeBalance] = await multiProvider.all([
            multiLeagueTournamentContract.balanceOf(address),
        ]);
        const p = [];
        for (let i = 0; i < Number(planeBalance.toString()); i++) {
            p.push(
                multiLeagueTournamentContract.tokenOfOwnerByIndex(address, i),
            );
        }
        const tokenIds = await multiProvider.all(p);
    };

    useEffect(() => {
        if (!multiProvider || !multiLeagueTournamentContract) return;
        handleInit();
    }, [multiProvider, multiLeagueTournamentContract]);

    useEffect(() => {
        if (!address || !multiProvider || !multiLeagueTournamentContract)
            return;

        handleGetMyPlane();
    }, [multiProvider, multiLeagueTournamentContract, address]);

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
            <PrizeMoney pot={pot}></PrizeMoney>
            <Toolbar></Toolbar>
            <Status></Status>
            <AllAviation newcomerList={newcomerList}></AllAviation>
            <BtButton
                onAvaitionClick={onOpen}
                onPlayClick={onChoosePlaneOpen}
            ></BtButton>
            {/* <Warning></Warning> */}
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
