import { Flex, Image } from "@chakra-ui/react";
import BiddingIcon from "@/assets/bidding.gif";
import LoadingText from "./BttComponents/LoadingText";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const LoadingPage = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
            }}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
        >
            <Image
                src={BiddingIcon}
                sx={{
                    width: isPc ? "120px" : "60px",
                }}
            ></Image>
            <LoadingText></LoadingText>
        </Flex>
    );
};

export default LoadingPage;
