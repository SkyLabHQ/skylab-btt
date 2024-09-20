import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";

import PaperVideo from "./assets/paper.mp4";
import NewcomerVideo from "./assets/newcomer.mp4";
import RuleWrap, { CircleContent, LastPlane } from "./RuleWrap";
import { BottomButton } from "./Rule";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { useNavigate } from "react-router-dom";
import DownIcon from "./assets/down-icon.svg";

const RuleContent1 = ({
    onChangeActiveIndex,
}: {
    onChangeActiveIndex: (activeIndex: number) => void;
}) => {
    const navigate = useNavigate();
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const { isOpen, onToggle } = useDisclosure({
        defaultIsOpen: false,
    });

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
                    How to Become the{" "}
                    <span
                        style={{
                            color: "#F2D861",
                            fontSize: isPc ? "24px" : "16px",
                            fontWeight: 700,
                        }}
                    >
                        {" "}
                        <LastPlane></LastPlane>
                    </span>{" "}
                    ?{" "}
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
                    <source src={PaperVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text
                    sx={{
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        onToggle();
                    }}
                >
                    At any given moment, each level has one{" "}
                    <LastPlane></LastPlane>. It's the last plane that ascends to
                    the level.
                    <Image
                        src={DownIcon}
                        sx={{
                            display: "inline-block",
                            marginLeft: "4px",
                            transform: isOpen
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                            transition: "all 0.3s",
                        }}
                    ></Image>
                </Text>{" "}
                <Box
                    sx={{
                        transition: "all 0.3s",
                        maxHeight: isOpen ? "600px" : "0",
                        overflow: "hidden",
                    }}
                >
                    <CircleContent
                        text={
                            <Text>
                                <span>At Level 1</span> : When you fold/mint a
                                paper plane, it starts with{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                >
                                    1 XP{" "}
                                </span>{" "}
                                and automatically becomes the{" "}
                                <LastPlane></LastPlane> at{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                >
                                    {" "}
                                    Level 1.
                                </span>
                            </Text>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Text>
                                <span>At Other Levels </span> : A plane’s{" "}
                                <span>XP</span> determines its level. When it
                                gains{" "}
                                <span
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                    onClick={() => {
                                        onChangeActiveIndex(4);
                                    }}
                                >
                                    enough XP
                                </span>{" "}
                                , it <span>upgrades to the next level</span> and
                                becomes the <LastPlane></LastPlane> of that
                                level.
                            </Text>
                        }
                    ></CircleContent>
                </Box>
                <Text
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    You are the <LastPlane></LastPlane> until another player’s
                    plane upgrades to that level and{" "}
                    <span>
                        steal the <LastPlane></LastPlane>
                    </span>{" "}
                    position . When this happens, the countdown timer for that
                    level also
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                            cursor: "pointer",
                            textDecoration: "underline",
                        }}
                        onClick={() => {
                            onChangeActiveIndex(4);
                        }}
                    >
                        {" "}
                        resets to its starting point.
                    </span>
                </Text>
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
                <source src={NewcomerVideo} type="video/mp4" />
            </video>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text
                    sx={{
                        marginTop: isPc ? "16px" : "8px",
                    }}
                >
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        {" "}
                        So, how do you gain XP for upgrading
                    </span>{" "}
                    ? By playing{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate("/btt");
                        }}
                    >
                        Bid Tac Toe.
                    </span>
                </Text>
            </RuleWrap>
            <BottomButton
                activeIndex={1}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent1;
