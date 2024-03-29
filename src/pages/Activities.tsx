import { Box } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Leaderboard } from "../components/Tournament";
import MercuryBg from "@/components/Tournament/assets/mercury-bg.png";
import BlueBg from "@/components/Tournament/assets/blue-bg.png";
import { Contract } from "ethers-multicall";
import ConnectWalletRound from "../components/Tournament/ConnectWalletRound";
import MissionRound from "../components/Tournament/MissionRound";
import BgImgD from "../components/Tournament/BgImgD";
import { skylabTournamentAddress } from "@/hooks/useContract";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { DEAFAULT_CHAINID } from "@/utils/web3Utils";
import SKYLABTOURNAMENT_ABI from "@/skyConstants/abis/SkylabTournament.json";
import PilotDetail from "@/components/Tournament/PilotDetail";
import PilotLeaderboard from "@/components/Tournament/PilotLeaderboard";
import { useMultiProvider } from "@/hooks/useMultiContract";
import CurrentPilot from "@/components/Tournament/CurrentPilot";
import BabyMerc from "@/components/Tournament/BabyMerc";
import TournamentHelmet from "@/components/Helmet/TournamentHelmet";

const Activities = (): ReactElement => {
    const { search } = useLocation();
    const [step, setStep] = useState<number | string>(1);
    const [currentRound, setCurrentRound] = useState(-1);
    const ethcallProvider = useMultiProvider(DEAFAULT_CHAINID);

    const handleNextStep = (nextStep?: number | string) => {
        setStep(nextStep);
        window.history.pushState({}, "", `?step=${nextStep}`);
    };

    const handleGetRound = async () => {
        const tournamentContract = new Contract(
            skylabTournamentAddress[DEAFAULT_CHAINID],
            SKYLABTOURNAMENT_ABI,
        );

        const [round] = await ethcallProvider.all([
            tournamentContract._currentRound(),
        ]);

        setCurrentRound(round.toNumber());
    };

    useEffect(() => {
        const params = qs.parse(search) as any;
        if (!params.step) {
            return;
        }
        setStep(params.step);
    }, []);

    useEffect(() => {
        if (!ethcallProvider) return;
        handleGetRound();
    }, [ethcallProvider]);

    return (
        <>
            <TournamentHelmet></TournamentHelmet>
            <Box
                w="100vw"
                h="100%"
                pos="relative"
                background={`url(${MercuryBg}), url(${BlueBg})`}
                backgroundPosition="center center, 0 0"
                backgroundSize={"cover, cover"}
                backgroundRepeat={"no-repeat, no-repeat"}
                overflow="hidden"
                fontFamily="Orbitron"
                id="test"
            >
                <Box w="100vw" h="100%">
                    <Box zIndex={9} h="100%">
                        {step == 0 && (
                            <Leaderboard
                                currentRound={currentRound}
                                onNextRound={handleNextStep}
                            />
                        )}
                        {step == 1 && (
                            <ConnectWalletRound onNextRound={handleNextStep} />
                        )}

                        {step == 2 && (
                            <MissionRound onNextRound={handleNextStep} />
                        )}

                        {step === "pilotDetail" && <PilotDetail></PilotDetail>}
                        {step === "pilotLeaderboard" && (
                            <PilotLeaderboard></PilotLeaderboard>
                        )}
                        {step === "currentPilot" && (
                            <CurrentPilot
                                onNextRound={handleNextStep}
                            ></CurrentPilot>
                        )}
                        {step === "babyMerc" && (
                            <BabyMerc onNextRound={handleNextStep}></BabyMerc>
                        )}
                    </Box>

                    {step === 0 && <BgImgD show={true}></BgImgD>}
                </Box>
            </Box>
        </>
    );
};

export default Activities;
