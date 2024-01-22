import {
    Box,
    Text,
    Image,
    SimpleGrid,
    MenuItem,
    MenuButton,
    MenuList,
    Menu,
    Button,
    useMediaQuery,
} from "@chakra-ui/react";

import MenuIcon from "./assets/menu.svg";
import { menuList, menuList2 } from "./MissionRound";

const TopMenu = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Menu>
            <MenuButton
                as={Button}
                sx={{
                    width: isPc ? "2.2917vw" : "32px",
                    height: isPc ? "2.2917vw" : "32px",
                    background: "transparent !important",
                    border: "2px solid #F2D861",
                    display: "flex",
                    alignItems: "center",
                    color: "#F2D861",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "4px",
                    justifyContent: "center",
                    minWidth: isPc ? "2.2917vw" : "32px",
                    minHeight: isPc ? "2.2917vw" : "32px",
                    borderRadius: isPc ? "0.625vw" : "8px",
                }}
            >
                <Image
                    src={MenuIcon}
                    sx={{
                        width: isPc ? "2vw" : "28px",
                        height: isPc ? "2vw" : "28px",
                    }}
                ></Image>
            </MenuButton>

            <MenuList
                sx={{
                    background: "rgb(135,135,135)",
                    color: "#F2D861",
                    width: "219.9994px",
                    padding: isPc ? "0.5208vw" : "8px",
                    borderRadius: "1.0417vw",
                }}
            >
                <Box>
                    <SimpleGrid columns={3} spacing={0} spacingY={2}>
                        {menuList.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        background: "transparent",
                                        cursor: item.onClick
                                            ? "pointer"
                                            : "no-drop",
                                        padding: "0",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                    onClick={() => {
                                        item?.onClick();
                                    }}
                                >
                                    <Image
                                        sx={{
                                            width: isPc ? "2.7083vw" : "32px",
                                            height: isPc ? "2.7083vw" : "32px",
                                        }}
                                        src={item.icon}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: isPc
                                                ? "0.6771vw"
                                                : "12px",
                                            textAlign: "center",
                                            lineHeight: isPc
                                                ? "0.6771vw"
                                                : "12px",
                                            marginTop: "2px",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                </MenuItem>
                            );
                        })}
                    </SimpleGrid>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0.5208vw 0",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: "1px",
                            background: "#FDDC2D",
                        }}
                    ></Box>
                    <Text>SNS</Text>
                    <Box
                        sx={{
                            flex: 1,
                            height: "1px",
                            background: "#FDDC2D",
                        }}
                    ></Box>
                </Box>
                <SimpleGrid columns={3} spacing={0}>
                    {menuList2.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    sx={{
                                        width: isPc ? "2.7083vw" : "32px",
                                        height: isPc ? "2.7083vw" : "32px",
                                        cursor: "pointer",
                                    }}
                                    src={item.icon}
                                    onClick={() => {
                                        item?.onClick();
                                    }}
                                ></Image>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            </MenuList>
        </Menu>
    );
};
export default TopMenu;
