import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";
import EnterLoadingIcon from "@/assets/enter-loading.gif";
import DotLoading from "@/components/Loading/DotLoading";
const SubmitRequestContext = createContext<{
    isLoading: boolean;
    openLoading: () => void;
    closeLoading: () => void;
}>(null);

export const SubmitRequestProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const openLoading = () => {
        setIsLoading(true);
    };

    const closeLoading = () => {
        setIsLoading(false);
    };

    return (
        <SubmitRequestContext.Provider
            value={{ isLoading, openLoading, closeLoading }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                {children}

                {isLoading && (
                    <Flex
                        sx={{
                            backdropFilter: "blur(3px)",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            background: "rgba(0, 0, 0, 0.37)",
                            zIndex: "10000",
                        }}
                        flexDir={"column"}
                        align={"center"}
                        justify={"center"}
                    >
                        <Image
                            src={EnterLoadingIcon}
                            sx={{
                                width: "60px",
                            }}
                        ></Image>
                        <Text>Submit request </Text>
                        <DotLoading></DotLoading>
                    </Flex>
                )}

                {/* 其他组件内容 */}
            </Box>
        </SubmitRequestContext.Provider>
    );
};

export const useSubmitRequest = () => {
    return useContext(SubmitRequestContext);
};
