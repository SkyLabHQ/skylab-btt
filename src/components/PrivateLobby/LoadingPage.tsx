import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import BiddingIcon from "./assets/bidding.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import DotLoading from "../Loading/DotLoading";
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

const text = [
    "Rearranging the chessboard",
    "Sharpening the pawns",
    "Buffing the bishops",
    "Knighting the knights",
    "Conferencing the rooks",
    "Crowning the kings and queens",
    "Teaching pawns to walk diagonally",
    "Setting the stage for the grand strategy",
    "Calculating optimal moves",
    "Delegating duties to the knights",
    "Organizing a royal assembly",
    "Laying out the tactical board",
    "Avoiding stalemate situations",
    "Designing the Sicilian Defense",
    "Polishing the Nimzo-Indian Attack",
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
    "Spooling the hyperdrive",
    "Generating gravitational field",
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
];

const randomText = shuffleArray(text);

const LoadingPage = () => {
    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
            }}
            align={"center"}
            justify={"center"}
            direction={"column"}
        >
            <Image
                src={BiddingIcon}
                sx={{
                    width: "60px",
                }}
            ></Image>

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
        </Flex>
    );
};

export default LoadingPage;
