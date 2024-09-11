import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { Box, keyframes, Text } from "@chakra-ui/react";

const colorKeyframes = keyframes`
    0% {
        color: #646464;
        opacity: 0.1;
        text-shadow: 0 0 10px #fff;
     }
    
    14.3% {
        color: #FFF;
        opacity: 1;
        text-shadow: none;
    }

    28.6% {
        color: #646464;
        opacity: 0.1;        
        text-shadow: 0 0 10px #fff;
    }
    
    100% {
        color: #646464;
        opacity: 0.1;
        text-shadow: 0 0 10px #fff;
    }
`;

const Info = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const rules = [
        <Text>
            In Crypto,<br></br>{" "}
            <span
                style={{
                    fontSize: isPc ? "20px" : "14px",
                    fontWeight: "700",
                }}
            >
                Attention is limited.
            </span>{" "}
            Most hot things eventually die down.
        </Text>,
        <Text>
            When your favorite hot thing fades, forgotten and abandoned by
            everyone else,{" "}
            <span
                style={{
                    fontSize: isPc ? "20px" : "14px",
                    fontWeight: "700",
                }}
            >
                {" "}
                you are heartbroken.
            </span>
        </Text>,
        <Text>
            Of course.{" "}
            <span
                style={{
                    fontSize: isPc ? "20px" : "14px",
                    fontWeight: "700",
                }}
            >
                We’ve all been there.
            </span>{" "}
        </Text>,
        <Text>
            If people tend to forget, in a world where everything fights to be
            remembered,
            <span
                style={{
                    fontSize: isPc ? "20px" : "14px",
                    fontWeight: "700",
                }}
            >
                why isn’t there something that’s designed to be forgotten?
            </span>
        </Text>,
        <Text>
            <span
                style={{
                    fontSize: isPc ? "20px" : "14px",
                    fontWeight: "700",
                }}
            >
                the social game that you’ll wish would die down.
            </span>{" "}
        </Text>,
        <Text>
            {" "}
            <span
                style={{
                    fontSize: isPc ? "20px" : "14px",
                    fontWeight: "700",
                }}
            >
                Because when everyone else forgets, you and your team, shall
                take it all.
            </span>{" "}
        </Text>,
    ];
    return (
        <Box
            sx={{
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
                padding: isPc ? "0 0 40px" : "0 20px 40px",
            }}
        >
            <Box
                sx={{
                    color: "#646464",
                    lineHeight: isPc ? "28px" : "20px",
                    letterSpacing: "1px",
                    marginTop: isPc ? "40px" : "20px",
                }}
            >
                {rules.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                fontSize: isPc ? "14px" : "12px",
                            }}
                        >
                            <Box
                                sx={{
                                    animationDelay: `${index * 4}s`,
                                    marginBottom: isPc ? "30px" : "20px",
                                    opacity: 0.1,
                                    textShadow: "0 0 10px #FFF",
                                }}
                                animation={`${colorKeyframes} 24s linear infinite`}
                                key={index}
                            >
                                {item}
                            </Box>
                            <Box
                                sx={{
                                    background: "transparent",
                                    position: "absolute",
                                    left: "0",
                                    top: "0",
                                    width: "100%",
                                    height: "100%",
                                    transition: "all 0s",
                                }}
                            ></Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Info;
