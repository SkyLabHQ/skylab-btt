import { Box, Flex, keyframes, Text } from "@chakra-ui/react";
const rules = [
    <Text>
        In Crypto,<br></br>Attention is limited. Most hot things eventually die
        down.
    </Text>,
    <Text>
        When your favorite hot thing fades, forgotten and abandoned by everyone
        else, you are heartbroken.
    </Text>,
    <Text>Of course. We’ve all been there.</Text>,
    <Text>
        If people tend to forget, in a world where everything fights to be
        remembered, why isn’t there something that’s designed to be forgotten?
    </Text>,
    <Text>
        So, we create this social game – that you’ll wish would die down.{" "}
        <br></br>Oops. Not just you wish its dying. Everyone does.
    </Text>,
    <Text>
        Because when everyone else forgets, you and your league, shall take it
        all.
    </Text>,
];

const colorKeyframes = keyframes`
    0% {
        color: #646464;
    }
    
    14.3% {
        color: #FFF;
    }

    28.6% {
        color: #646464;
    }
    
    100% {
        color: #646464;
    }
`;

const bgKeyframes = keyframes`
    0% {
        background-filter: blur(0px);
    }
    

    28.6% {
        color: #646464;
    }
    
    100% {
        color: #646464;
    }
`;

const Info = () => {
    return (
        <Box
            sx={{
                maxWidth: "1344px",
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
                            }}
                        >
                            <Box
                                sx={{
                                    animationDelay: `${index * 2.5}s`,
                                    marginBottom: "30px",
                                }}
                                animation={`${colorKeyframes} 15s linear infinite`}
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
