import { Box, keyframes, Text } from "@chakra-ui/react";
const rules = [
    <Text>
        In Crypto,<br></br>{" "}
        <span
            style={{
                fontSize: "20px",
                fontWeight: "700",
            }}
        >
            Attention is limited.
        </span>{" "}
        Most hot things eventually die down.
    </Text>,
    <Text>
        When your favorite hot thing fades, forgotten and abandoned by everyone
        else,{" "}
        <span
            style={{
                fontSize: "20px",
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
                fontSize: "20px",
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
                fontSize: "20px",
                fontWeight: "700",
            }}
        >
            why isn’t there something that’s designed to be forgotten?
        </span>
    </Text>,
    <Text>
        So, we create{" "}
        <span
            style={{
                fontSize: "20px",
                fontWeight: "700",
            }}
        >
            this social game – that you’ll wish would die down.
        </span>{" "}
        <br></br>Oops. Not just you wish its dying. Everyone does.
    </Text>,
    <Text>
        Because{" "}
        <span
            style={{
                fontSize: "20px",
                fontWeight: "700",
            }}
        >
            when everyone else forgets, you and your league, shall take it all.
        </span>{" "}
    </Text>,
];

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
    return (
        <Box
            sx={{
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
                paddingBottom: "40px",
            }}
        >
            <Box
                sx={{
                    color: "#646464",
                    lineHeight: "28px",
                    fontSize: "20px",
                    letterSpacing: "4px",
                    marginTop: "40px",
                }}
            >
                {rules.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                fontSize: "14px",
                            }}
                        >
                            <Box
                                sx={{
                                    animationDelay: `${index * 4}s`,
                                    marginBottom: "30px",
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
