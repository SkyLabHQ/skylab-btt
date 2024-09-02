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

const Info = () => {
    return (
        <Box
            sx={{
                maxWidth: "1344px",
                width: "100%",
                margin: "0 auto",
            }}
        >
            <Box
                sx={{
                    color: "#646464",
                    lineHeight: "70px",
                    fontSize: "38px",
                    letterSpacing: "4px",
                    marginTop: "200px",
                }}
            >
                {rules.map((item, index) => {
                    return (
                        <Box
                            sx={{
                                animationDelay: `${index * 1.5}s`,
                                marginBottom: "40px",
                            }}
                            animation={`${colorKeyframes} 10.5s linear infinite`}
                            key={index}
                        >
                            {item}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Info;