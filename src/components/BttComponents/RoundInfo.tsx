import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { Box, Text } from "@chakra-ui/react";

const RoundInfo = ({
    currentRound,
    allRound,
}: {
    currentRound: number;
    allRound: number;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                borderRadius: isPc ? "20px" : "8px",
                background: "#d9d9d9",
                display: "flex",
                width: isPc ? "132px" : "86px",
                alignItems: "center",
                justifyContent: "center",
                margin: isPc ? "50px auto 0" : "20px auto 0",
                height: isPc ? "36px" : "16px",
            }}
        >
            <Text
                sx={{
                    fontSize: isPc ? "16px" : "12px",
                    color: "#303030",
                }}
            >
                Round {currentRound}
                <span
                    style={{
                        color: "#616161",
                        fontSize: isPc ? "14px" : "12px",
                    }}
                >
                    /{allRound}
                </span>
            </Text>
        </Box>
    );
};

export default RoundInfo;
