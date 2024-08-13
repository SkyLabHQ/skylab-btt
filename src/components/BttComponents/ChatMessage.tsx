import { Box, Image, Flex, SimpleGrid } from "@chakra-ui/react";
import KeyDeleteIcon from "./assets/key-delete.svg";

const BottomKeyBoard = ({
    inputMode,
    open,
    onNumberClick,
    onDeleteClick,
}: {
    inputMode: "keyboard";
    open: boolean;
    onNumberClick: (value: string) => void;
    onDeleteClick: () => void;
}) => {
    return (
        <Box
            sx={{
                background: "#303030",
                height: open ? "108px" : "0px",
                overflow: "hidden",
                transition: "height 0.3s",
            }}
        >
            {inputMode === "keyboard" && (
                <SimpleGrid
                    columns={3}
                    spacingX={2}
                    spacingY={2}
                    sx={{
                        padding: "10px",
                    }}
                >
                    {[5, 10, 15, 20, 30].map((item) => {
                        return (
                            <Flex
                                onClick={() => {
                                    onNumberClick(item.toString());
                                }}
                                align={"center"}
                                justify={"center"}
                                key={item}
                                sx={{
                                    borderRadius: "4px",
                                    background: "#787878",
                                    height: "40px",
                                    fontSize: "28px",
                                }}
                            >
                                +{item}
                            </Flex>
                        );
                    })}

                    <Image
                        onClick={onDeleteClick}
                        src={KeyDeleteIcon}
                        sx={{
                            width: "100%",
                        }}
                    ></Image>
                </SimpleGrid>
            )}
        </Box>
    );
};

export default BottomKeyBoard;
