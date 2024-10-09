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
import { useChainId, usePublicClient } from "wagmi";
import { useLeagueTournamentContract } from "@/hooks/useContract";
import { ZERO_DATA } from "@/skyConstants";
import { useUserInfo } from "@/contexts/UserInfo";
import { getMintSignature } from "@/api/tournament";
import { isAddress } from "@/utils/isAddress";
import { leagueAddressList } from "@/utils/league";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { parseAmount } from "@/utils/formatBalance";

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
    const toast = useSkyToast();
    const publicClient = usePublicClient();
    const leagueTournamentContract = useLeagueTournamentContract();
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
            p.push(multiLeagueTournamentContract.getNewComerInfo(i));
        }

        const [pot, ...res] = await multiProvider.all(p);

        console.log(pot, "pot");

        setPot(pot.toString());
        const list: Newcomer[] = [];
        console.log(res, "res");
        res.forEach((item) => {
            list.push({
                claimTIme: item.claimTime.toNumber(),
                newComerId: item.newComerId.toNumber(),
                // owner: item[2],
                owner: ZERO_DATA,
                point: item.point.toNumber(),
                leader: item.leader,
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

    const handleMint = async (leader: string) => {
        try {
            let referral = sessionStorage.getItem("referral");
            const expirationTime = Math.floor(Date.now() / 1000) + 86400;
            let signature = "";
            if (isAddress(referral)) {
                const res = await getMintSignature(referral, expirationTime);
                console.log(res, "r");
            } else {
                referral = ZERO_DATA;
            }

            console.log(referral, expirationTime, signature, "signature");
            const hash = await leagueTournamentContract.write.mint(
                [leader, referral, expirationTime, signature],
                {
                    value: parseAmount("0.02"),
                },
            );

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }
        } catch (e) {
            toast(handleError(e));
        }

        // const res= await getMintSignature("0x")
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
                handleMint={handleMint}
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
