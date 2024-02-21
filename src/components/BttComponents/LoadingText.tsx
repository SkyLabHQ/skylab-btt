import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import BiddingIcon from "./assets/bidding.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import DotLoading from "../Loading/DotLoading";

const text = [
    "Spicing up pixels",
    "Polishing screen pixels",
    "Revving up the hamsters",
    "Assembling unicorns",
    "Charging the flux capacitor",
    "Rounding up the electrons",
    "Condensing the clouds",
    "Beaming down the data",
    "Perfecting the pixels",
    "Dispatching the dwarves",
    "Summoning the internet sprites",
    "Gathering magic dust",
    "Performing ritual for good luck",
    "Energizing photon particles",
    "Calling upon the data gods",
    "Herding bits",
    "Fueling up the antimatter engine",
    "Tickling the sub-pixels",
    "Bouncing the reality grid",
    "Cranking up the reality amplifier",
    "Channeling Matrix",
    "Wrestling with time complexity",
    "Unleashing quantum ponies",
    "Propagating neural synchrony",
    "Evolving the hyperspace",
    "Jiggling the cosmic web",
    "Dusting off the cobwebs of servers",
    "Awakening the AI gods",
    "We are cleaning the lobby floor",
    "Cleaning the game board",
    "Drawing the board lines",
    "Preparing gold",
    "Checking O & X pieces",
];
function shuffleArray(array: string[]) {
    // Create a copy of the original array to avoid modifying the input array
    const shuffledArray = [...array];

    // Fisher-Yates (Knuth) Shuffle Algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }

    return shuffledArray;
}

const randomText = shuffleArray(text);

const LoadingText = () => {
    return (
        <Swiper
            style={{
                width: "100%",
                position: "relative",
                fontSize: "16px",
                marginTop: "16px",
            }}
            modules={[Autoplay]}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
        >
            {randomText.map((item, index) => {
                return (
                    <SwiperSlide
                        key={index}
                        style={{
                            background: "transparent",
                            color: "#fff",
                            textAlign: "center",
                        }}
                    >
                        <Flex justify={"center"} align={"center"}>
                            <DotLoading text={item}></DotLoading>
                        </Flex>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
export default LoadingText;
