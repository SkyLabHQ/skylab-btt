import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAllBttTransaction } from "@/hooks/useTacToeStore";
import BttIcon from "@/assets/btt-icon.png";
import LevelUpIcon from "@/assets/level-up.svg";
import LevelDownIcon from "@/assets/level-down.svg";
import dayjs from "dayjs";
import PlayBackIcon from "@/assets/playback-icon.svg";
import { shortenAddressWithout0x } from "@/utils";
import BttHelmet from "@/components/Helmet/BttHelmet";
import Back from "@/components/Back";

const ListBorder = () => {
    return (
        <Box
            sx={{
                marginTop: "0.625vw",
                height: "1px",
                background:
                    "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 9.44%, rgba(255, 255, 255, 0.39) 85.56%, rgba(255, 255, 255, 0.00) 100%)",
            }}
        ></Box>
    );
};

interface RecordInfo {
    chainId: number;
    account: string;
    time: number;
    tokenId: number;
    gameAddress: string;
    oldLevel: number;
    newLevel: number;
    oldPoint: number;
    newPoint: number;
    burner: string;
    win: boolean;
}

const MBttHistory = ({
    allRecords,
    handleToPlayBack,
}: {
    allRecords: RecordInfo[];
    handleToPlayBack: (value: RecordInfo) => void;
}) => {
    return (
        <Box
            sx={{
                position: "relative",
                background: "#303030",
                height: "100%",
            }}
        >
            <Text
                sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                }}
            >
                History
            </Text>
            <Box
                sx={{
                    fontSize: "24px",
                    height: "420px",
                    overflowY: "auto",
                    marginTop: "30px",
                }}
            >
                {allRecords.map((item) => {
                    return (
                        <Box
                            key={item.gameAddress}
                            sx={{
                                padding: "6px 0 12px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    fontSize: "12px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        sx={{
                                            fontWeight: 800,
                                            color: item.win
                                                ? "#FDDC2D"
                                                : "#BCBBBE",
                                            width: "32px",
                                        }}
                                    >
                                        {item.win ? "Win" : "Lose"}
                                    </Text>
                                    <Image
                                        sx={{
                                            marginRight: "10px",
                                        }}
                                        src={
                                            item.win
                                                ? LevelUpIcon
                                                : LevelDownIcon
                                        }
                                    ></Image>
                                </Box>

                                <Box>
                                    <Text
                                        sx={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Lvl.{item.oldLevel} {">>"} Lvl.
                                        {item.newLevel}{" "}
                                    </Text>
                                    <Text>
                                        Pts {item.oldPoint} (
                                        {item.win
                                            ? "+" +
                                              (item.newPoint - item.oldPoint)
                                            : item.newPoint - item.oldPoint}
                                        )
                                    </Text>
                                </Box>

                                <Text
                                    sx={{
                                        width: "140px",
                                        textAlign: "right",
                                    }}
                                >
                                    {dayjs(item.time).format(
                                        "HH:mm MM-DD-YYYY",
                                    )}
                                </Text>
                                <Image
                                    sx={{
                                        cursor: "pointer",
                                        width: "21px",
                                    }}
                                    onClick={() => handleToPlayBack(item)}
                                    src={PlayBackIcon}
                                ></Image>
                            </Box>
                            <ListBorder></ListBorder>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

const BttHistory = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const allRecords = useAllBttTransaction();

    const handleToPlayBack = (record: RecordInfo) => {
        const { gameAddress, burner, chainId } = record;
        navigate(
            `/btt/playback?gameAddress=${gameAddress}&burner=${shortenAddressWithout0x(
                burner,
            )}&chainId=${chainId}`,
        );
    };

    return (
        <Box
            sx={{
                height: "100%",
                position: "relative",
                padding: isPc ? "140px 150px" : "60px 20px 20px",
                fontFamily: "Quantico",
                background: "#303030",
            }}
        >
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    position: "absolute",
                    left: "1.0417vw",
                    top: "1.0417vw",
                }}
            >
                <Back onClick={() => navigate("/btt")}></Back>
            </Box>

            {isPc ? (
                <Box
                    sx={{
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            borderTop: "1px solid #fff",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: isPc ? "24px" : "20px",
                                fontWeight: "500",
                                marginTop: "21px",
                            }}
                        >
                            History
                        </Text>
                        <Box
                            sx={{
                                fontSize: "24px",
                                height: "calc(100vh - 340px)",
                                overflowY: "auto",
                            }}
                        >
                            {allRecords.map((item) => {
                                return (
                                    <Box
                                        key={item.gameAddress}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "200px",
                                            }}
                                        >
                                            <Image
                                                src={BttIcon}
                                                sx={{
                                                    width: "74px",
                                                    marginRight: "15px",
                                                }}
                                            ></Image>
                                            <Text
                                                sx={{
                                                    fontSize: "24px",
                                                    fontWeight: 800,
                                                    color: item.win
                                                        ? "#FDDC2D"
                                                        : "#BCBBBE",
                                                    width: "100px",
                                                }}
                                            >
                                                {item.win ? "Win" : "Lose"}
                                            </Text>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "200px",
                                            }}
                                        >
                                            <Image
                                                sx={{
                                                    marginRight: "10px",
                                                }}
                                                src={
                                                    item.win
                                                        ? LevelUpIcon
                                                        : LevelDownIcon
                                                }
                                            ></Image>
                                            <Text
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                Lvl.{item.oldLevel} {">>"} Lvl.
                                                {item.newLevel}{" "}
                                            </Text>
                                        </Box>
                                        <Text sx={{ width: "260px" }}>
                                            Points net {item.oldPoint} (
                                            {item.win
                                                ? "+" +
                                                  (item.newPoint -
                                                      item.oldPoint)
                                                : item.newPoint - item.oldPoint}
                                            )
                                        </Text>
                                        <Text
                                            sx={{
                                                width: "280px",
                                            }}
                                        >
                                            {dayjs(item.time).format(
                                                "HH:mm MM-DD-YYYY",
                                            )}
                                        </Text>
                                        <Image
                                            sx={{
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                handleToPlayBack(item)
                                            }
                                            src={PlayBackIcon}
                                        ></Image>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            ) : (
                <MBttHistory
                    allRecords={allRecords}
                    handleToPlayBack={handleToPlayBack}
                ></MBttHistory>
            )}
        </Box>
    );
};

export default BttHistory;
