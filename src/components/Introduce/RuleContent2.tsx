import { Box, Flex, Text, Image } from "@chakra-ui/react";

import GameVideo from "./assets/game.mp4";
import Game1Video from "./assets/game1.mp4";

import RuleWrap, { CircleContent } from "./RuleWrap";
import { BottomButton } from "./Rule";
import { TG_URL } from "@/skyConstants/tgConfig";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { useNavigate } from "react-router-dom";

const RuleContent2 = ({
    onChangeActiveIndex,
}: {
    onChangeActiveIndex: (activeIndex: number) => void;
}) => {
    const navigate = useNavigate();
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Box>
            <Box>
                <Text
                    sx={{
                        fontSize: isPc ? "20px" : "14px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    The Game: Bid Tac Toe{" "}
                </Text>
                <video
                    playsInline
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: isPc ? "20px auto" : "12px auto",
                    }}
                >
                    <source src={Game1Video} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text>
                    In{" "}
                    <span
                        style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                        onClick={() => {
                            navigate("/btt");
                        }}
                    >
                        Bid Tac Toe
                    </span>
                    , planes go head-to-head, wagering their{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        XP
                    </span>{" "}
                    as the stakes.{" "}
                    <span>Each match lasts around 3 minutes.</span>
                </Text>
                <CircleContent
                    text={
                        <Text>
                            <span
                                style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                                onClick={() => {
                                    navigate("/btt");
                                }}
                            >
                                Bid Tac Toe
                            </span>{" "}
                            is a variation of Tic Tac Toe, where players{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                blind-bid
                            </span>{" "}
                            for each grid space to form a row of three.
                        </Text>
                    }
                ></CircleContent>
            </RuleWrap>
            <video
                playsInline
                autoPlay
                loop
                muted
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "20px auto",
                }}
            >
                <source src={GameVideo} type="video/mp4" />
            </video>
            <BottomButton
                activeIndex={2}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent2;
