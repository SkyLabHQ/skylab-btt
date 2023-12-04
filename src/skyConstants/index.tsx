import { createIcon } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import { css } from "@emotion/react";

export const PolygonIcon = createIcon({
    displayName: "Polygon Network",
    viewBox: "0 0 38.4 33.5",
    path: (
        <path
            fill="#8247E5"
            d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3 c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7 c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1 L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"
        />
    ),
});

export const CHAIN_ID_MAP: { [key: number]: string } = {
    "-1": "unknown",
    0: "kardia",
    1: "ethereum",
    8: "ubiq",
    10: "optimism",
    19: "songbird",
    20: "elastos",
    25: "cronos",
    30: "rsk",
    40: "telos",
    52: "csc",
    55: "zyx",
    56: "binance",
    57: "syscoin",
    60: "gochain",
    61: "ethclassic",
    66: "okexchain",
    70: "hoo",
    82: "meter",
    88: "tomochain",
    100: "xdai",
    106: "velas",
    108: "thundercore",
    122: "fuse",
    128: "heco",
    137: "polygon",
    200: "xdaiarb",
    246: "energyweb",
    250: "fantom",
    269: "hpb",
    288: "boba",
    321: "kucoin",
    336: "shiden",
    361: "theta",
    534: "candle",
    592: "astar",
    820: "callisto",
    888: "wanchain",
    1088: "metis",
    1284: "moonbeam",
    1285: "moonriver",
    2020: "ronin",
    2612: "ezchain",
    4689: "iotex",
    5050: "xlc",
    5551: "nahmii",
    8217: "klaytn",
    10000: "smartbch",
    32659: "fusion",
    42161: "arbitrum",
    42220: "celo",
    42262: "oasis",
    43114: "avalanche",
    71394: "godwoken",
    333999: "polis",
    1313161554: "aurora",
    1666600000: "harmony",
    11297108109: "palm",
    836542336838601: "curio",
};

export const sentenceVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.08,
        },
    },
};

export const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export const GlobalStyles = css`
    body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: white;
        background: black;
    }

    a:active,
    a:focus {
        box-shadow: none !important;
    }
    a.underline {
        display: block;
        position: relative;
        overflow: hidden;
    }
    a.underline:hover {
        text-decoration: none !important;
    }
    a.underline:hover::after,
    a.underline:focus::after {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    a.underline::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.2em;
        background-color: var(--chakra-colors-blue-500);
        transition: opacity 600ms, transform 300ms;
        transform: translate3d(-100%, 0, 0);
    }
`;

export const twitterUrl =
    "https://twitter.com/skylabhq?s=21&t=3tvwVYYbX3FtWjnf7IBmAA";

export const ZERO_DATA = "0x0000000000000000000000000000000000000000";
