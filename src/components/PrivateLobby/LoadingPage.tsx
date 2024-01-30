import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import BiddingIcon from "./assets/bidding.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
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
    "Spicing up pixels...",
    "Polishing screen pixels...",
    "Revving up the hamsters...",
    "Charging the flux capacitor...",
    "Rounding up the electrons...",
    "Beaming down the data...",
    "Perfecting the pixels...",
    "Summoning the internet sprites...",
    "Spooling the hyperdrive...",
    "Performing ritual for good luck...",
    "Calling upon the data gods...",
    "Tickling the sub-pixels...",
    "Bouncing the reality grid...",
    "Wrestling with time complexity...",
    "Evolving the hyperspace...",
    "Dusting off the cobwebs of servers...",
    "Awakening the AI gods...",
    "We are cleaning the lobby floor...",
    "Ready to cleaning the desk...",
    "Drawing the tac toe line...",
    "Prepare the Gold...",
    "Check the O & X chess...",
    "Rearranging the chessboard...",
    "Calculating optimal moves",
    "Laying out the tactical board",
    "Mastering the endgame",
    "Perfecting the bidding structure",
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
                            {item}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Flex>
    );
};

export default LoadingPage;
