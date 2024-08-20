import { Box, Text, Image, Flex, BoxProps } from "@chakra-ui/react";
import HumanPlane from "./assets/human-plane.png";
import LineBg from "./assets/line.png";
import styled from "@emotion/styled";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

export const GrayButtonStyle = styled(Box)`
    text-align: center;
    position: relative;
    align-items: center;
    display: flex;
    border: 3px solid #bcbbbe;
    border-radius: 0.9375vw;
    height: 3.3333vw;
    fontsize: 1.25vw;
    textalign: left;
    outline: none;
    width: 20.8333vw;
    box-shadow: 0.2083vw 0.2083vw 0vw 0px rgba(255, 255, 255, 0.5);
    justify-content: flex-start;
    padding: 0;
    cursor: pointer;
    &:focus {
        box-shadow: 0.2083vw 0.2083vw 0vw 0px rgba(255, 255, 255, 0.5);
    }
    &: [data-focus] {
        box-shadow: 0.2083vw 0.2083vw 0px 0px rgba(255, 255, 255, 0.5);
    }
    & .chakra-button__icon {
        position: absolute;
        right: 0.7813vw;
    }
`;

export const GrayButton = (props: BoxProps) => {
    return <GrayButtonStyle {...props}></GrayButtonStyle>;
};

export const PlayButtonGroup = ({
    tournamentDisabled,
    onPlayTournament,
}: {
    tournamentDisabled: boolean;
    onPlayTournament: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Quantico",
                    "& .bt": {
                        width: "100% !important",
                        height: `${isPc ? "90px" : "60px"} !important`,
                        justifyContent: "flex-end",
                        borderRadius: "18px !important",
                    },
                    "& .text-wrapper": {
                        width: `${isPc ? "280px" : "120px"} !important`,
                    },
                    "& .play-button-text": {
                        fontSize: isPc ? "32px" : "20px",
                        fontWeight: "400",
                    },
                    "& .play-button-text2": {
                        fontSize: isPc ? "20px" : "12px",
                        fontWeight: "400",
                    },
                }}
            >
                <Flex
                    sx={{
                        width: "100%",
                    }}
                    align={"center"}
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                    <Text
                        sx={{
                            fontSize: isPc ? "30px" : "16px",
                            fontWeight: 700,
                            WebkitTextStrokeWidth: 1,
                            WebkitTextStrokeColor: "#FDDC2D",
                            textAlign: "center",
                            margin: "0 10px",
                            fontFamily: "Orbitron",
                        }}
                    >
                        TOURNAMENT
                    </Text>
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                </Flex>
                <GrayButton
                    className="bt"
                    onClick={() => {
                        if (tournamentDisabled) {
                            return;
                        }
                        onPlayTournament();
                    }}
                    sx={{
                        paddingLeft: isPc
                            ? "100px !important"
                            : "40px !important",
                        marginTop: isPc ? "36px" : "20px",
                        background: tournamentDisabled && "#787878",
                        cursor: tournamentDisabled
                            ? "not-allowed !important"
                            : "cursor",
                    }}
                >
                    <Image
                        src={HumanPlane}
                        sx={{
                            width: isPc ? "120px" : "80px",
                            position: "absolute",
                            left: "-10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    ></Image>
                    <Box
                        sx={{
                            textAlign: "center",
                            width: "100%",
                        }}
                        className="text-wrapper"
                    >
                        <Text
                            className="play-button-text"
                            sx={{
                                color: tournamentDisabled ? "#bcbbbe" : "#fff",
                            }}
                        >
                            Start Game
                        </Text>
                        <Text
                            sx={{
                                color: tournamentDisabled
                                    ? "#bcbbbe"
                                    : "rgba(215, 200, 120, 1)",
                            }}
                            className="play-button-text2"
                        >
                            With Plane
                        </Text>
                    </Box>
                </GrayButton>
            </Box>
        </Box>
    );
};
