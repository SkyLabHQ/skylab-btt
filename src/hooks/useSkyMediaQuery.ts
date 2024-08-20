import { useMediaQuery, UseMediaQueryOptions } from "@chakra-ui/react";

const useSkyMediaQuery = (
    query: string | string[],
    options?: UseMediaQueryOptions,
) => {
    return useMediaQuery(query, {
        ssr: false,
        ...options,
    });
};

export default useSkyMediaQuery;
