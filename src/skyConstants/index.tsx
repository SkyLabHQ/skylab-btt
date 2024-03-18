import { css } from "@emotion/react";

export const GlobalStyles = css`
    @font-face {
        font-family: "Neoneon";
        src: url("/Neoneon.otf") format("opentype");
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: "neon";
        src: url("/neon.otf") format("opentype");
        font-weight: normal;
        font-style: normal;
    }
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    html {
        height: 100%;
    }
    body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: white;
        background: black;
        height: 100%;
    }
    #root {
        height: 100%;
    }
    p {
        margin: 0;
    }
`;

export const twitterUrl =
    "https://twitter.com/skylabhq?s=21&t=3tvwVYYbX3FtWjnf7IBmAA";

export const ZERO_DATA = "0x0000000000000000000000000000000000000000";
