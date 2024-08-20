import {
    ThemeComponents,
    ThemeConfig,
    extendTheme,
    extendBaseTheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const fonts = {
    body: "Quantico",
    heading: "Orbitron",
    mono: "Quantico",
};

// TO-DO: fix fonyts and add colors
const overrides = { config, fonts };

export default extendTheme(overrides);
