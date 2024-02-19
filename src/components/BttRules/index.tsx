import { Box, Text, Image, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import GardenIcon from "@/components/TacToe/assets/garden-icon.png";
import BackIcon from "@/components/TacToe/assets/back-arrow-home.svg";
import { useNavigate } from "react-router-dom";
import XpPilotsImg from "./assets/xp-pilots.png";
import CosmeticImg from "./assets/cosmetic-xp.png";
import MileageImg from "./assets/mileage.png";
import Arrow from "./assets/arrow.svg";
import Calculator from "./assets/calculator.svg";
import UpImg from "./assets/up.png";
import AllPlane from "./assets/all-plane.png";
import LeftArrow from "@/components/Tournament/assets/left-arrow.svg";
import RightArrow from "@/components/Tournament/assets/right-arrow.svg";
import StructAviation from "./assets/struct-aviation.png";
import All from "./assets/all.png";
import StructMileage from "./assets/struct-mileage.png";
import StructUp from "./assets/struct-up.png";
import StructCosmetic from "./assets/struct-cosmetic.png";
import StructScore from "./assets/struct-score.png";
import CircleBg from "./assets/circle-bg.png";
import PlanetIcon from "./assets/planet.png";
import PilotIcon from "./assets/pilot.png";
import MileageIcon from "./assets/mileage-icon.png";
import PlaneIcon from "./assets/plane.png";

enum RuleTabEnum {
    OVERAll = 0,
    AVIATIONSYSTEM = 1,
    XPPILOT = 2,
    COSMETIC = 3,
    MILEAGEXP = 4,
    UPMERCSBREEDING = 5,
}

const OverallStructure = ({ onBack }: { onBack: () => void }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const list = [
        {
            label: "All",
            img: All,
            desc: "",
        },
        {
            label: "Aviation Lvl-Pt",
            img: StructAviation,
            desc: (
                <Box>
                    Play games and win to{" "}
                    <span
                        style={{
                            color: "#FDDC2D",
                        }}
                    >
                        earn points(Pt)
                    </span>{" "}
                    for your aviation, accumulate Pt to{" "}
                    <span
                        style={{
                            color: "#FDDC2D",
                        }}
                    >
                        upgrade the level
                    </span>{" "}
                    of your aviation. Losing games will cost your Pt and your
                    aviation is at risk to be downgraded.
                </Box>
            ),
        },
        {
            label: "Mileage",
            img: StructMileage,
            desc: (
                <Box>
                    Simply play games to earn mileage, no matter win or lose.
                    Top players on mileage rank will be rewarded with{" "}
                    <span
                        style={{
                            color: "#FDDC2D",
                        }}
                    >
                        Upgrade Point(UP)
                    </span>{" "}
                    and{" "}
                    <span
                        style={{
                            color: "#FDDC2D",
                        }}
                    >
                        cosmetics
                    </span>
                    .
                </Box>
            ),
        },
        {
            label: "UP&Merc",
            img: StructUp,
            desc: (
                <Box>
                    Upgrade Power(UP) could breed your{" "}
                    <span
                        style={{
                            color: "#FDDC2D",
                        }}
                    >
                        Baby Mercs to Mercs
                    </span>
                    . The Vault will buy back Mercs.
                </Box>
            ),
        },
        {
            label: "Cosmetic Score",
            img: StructCosmetic,
            desc: (
                <Box>
                    Estate Score is the sum of Cosmetic Score and Aviation
                    Score. Project Mercury reward players with{" "}
                    <span
                        style={{
                            color: "#FDDC2D",
                        }}
                    >
                        Sales Tax
                    </span>{" "}
                    in proportion to Estate Score.
                </Box>
            ),
        },
        {
            label: "Estate Score",
            img: StructScore,
            desc: "Earn cosmetic through participating in tournament and staying high on Mileage rank. Cosmetic Score add to Estate Score.",
        },
    ];
    return (
        <Box
            sx={{
                maxWidth: "1200px",
                width: "100%",
                margin: "0 auto",
                paddingTop: "80px",
            }}
        >
            <Flex justify={"space-between"} align={"center"}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "80%",
                        justifyContent: "space-between",
                        position: "relative",
                    }}
                >
                    {list.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    if (activeIndex === index) {
                                        setActiveIndex(-1);
                                    } else {
                                        setActiveIndex(index);
                                    }
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: "20px",
                                        color:
                                            activeIndex === index
                                                ? "#FDDC2D"
                                                : "#D9D9D9",
                                        marginTop: "8px",
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </Box>
                        );
                    })}
                </Box>

                <Box
                    sx={{
                        cursor: "pointer",
                    }}
                    onClick={onBack}
                >
                    Back
                </Box>
            </Flex>

            <Box
                sx={{
                    border: "1px solid #FDDC2D",
                    borderRadius: "15px",
                    overflow: "hidden",
                    marginTop: "10px",
                }}
            >
                <Box
                    sx={{
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        overflow: "hidden",
                        padding: "40px 200px",
                    }}
                >
                    <Image
                        src={list[activeIndex].img}
                        sx={{
                            width: "100%",
                            margin: "0 auto",
                        }}
                    ></Image>
                </Box>
                {activeIndex >= 1 && (
                    <Flex
                        sx={{
                            height: "100px",
                        }}
                        align={"center"}
                        justify={"center"}
                    >
                        <Text
                            sx={{
                                maxWidth: "80%",
                                textAlign: "center",
                                fontSize: "20px",
                            }}
                        >
                            {list[activeIndex].desc}
                        </Text>
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

const AviationSystem = ({ onBack }: { onBack: () => void }) => {
    const [test, setTest] = useState(0);
    const handleSub = () => {
        if (test <= 0) return;
        setTest(test - 20);
    };

    const handleAdd = () => {
        if (test >= 100) return;
        setTest(test + 20);
    };

    return (
        <Box
            sx={{
                maxWidth: "1200px",
                width: "100%",
                margin: "0 auto",
                paddingTop: "80px",
            }}
        >
            <Text
                sx={{
                    fontSize: "32px",
                }}
            >
                Aviation Lvl-Pt System
            </Text>
            <Box
                sx={{
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid #FDDC2D",
                    borderRadius: "15px",
                    marginTop: "10px",
                }}
            >
                <Flex
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        padding: "0 60px",
                    }}
                >
                    <Box
                        sx={{
                            background: `url(${AllPlane}) no-repeat `,
                            backgroundSize: "155.7vw 100%",
                            backgroundPosition: `${test}% 0`,
                            width: "155.7vw",
                            height: "23vw",
                            transition: "all 1s",
                        }}
                    ></Box>
                    <Image
                        src={LeftArrow}
                        sx={{
                            position: "absolute",
                            left: "0.5208vw",
                            cursor: "pointer",
                            width: "1.25vw",
                        }}
                        onClick={handleSub}
                    ></Image>
                    <Image
                        src={RightArrow}
                        sx={{
                            position: "absolute",
                            right: "0.5208vw",
                            cursor: "pointer",
                            width: "1.25vw",
                        }}
                        onClick={handleAdd}
                    ></Image>
                </Flex>
                <Text
                    sx={{
                        fontSize: "20px",
                        lineHeight: "100px",
                        height: "100px",
                        textAlign: "center",
                    }}
                >
                    Point is earned through winning game.
                </Text>
            </Box>
        </Box>
    );
};

const XpPilot = () => {
    return (
        <Box sx={{}}>
            <Image src={XpPilotsImg} sx={{}}></Image>
            <Text
                sx={{
                    fontSize: "1.0417vw",
                    lineHeight: "2.6042vw",
                    textIndent: "3.125vw",
                }}
            >
                xp(experience point) = n% x aircraft holding point+ m% x
                cosmetic point + l% x mileage Players with top xp will split
                transaction fee for every [time interval], with the following
                ratio:
            </Text>
            <Box
                sx={{
                    marginTop: "5.2083vw",
                    "& table": { border: "1px solid #fff" },
                    "& td": {
                        border: "1px solid #fff",
                        width: "11.0417vw",
                        height: "3.4375vw",
                        paddingLeft: "40px",
                    },
                    "& tr": {
                        border: "1px solid #fff",
                    },
                }}
            >
                <table
                    style={{
                        borderCollapse: "collapse",
                    }}
                >
                    <tr>
                        <td>No.1</td>
                        <td>第一行，第二列</td>
                    </tr>
                    <tr>
                        <td>No.2</td>
                        <td>第二行，第二列</td>
                    </tr>
                    <tr>
                        <td>No.3</td>
                        <td>第三行，第二列</td>
                    </tr>
                </table>
            </Box>
        </Box>
    );
};

const CosmeticXp = () => {
    return (
        <Box sx={{}}>
            <Image src={CosmeticImg} sx={{}}></Image>
            <Box
                sx={{
                    width: "14.8958vw",
                    height: "38px",
                    borderRadius: "40px",
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    paddingLeft: "45px",
                    background:
                        "linear-gradient(90deg, rgba(43, 43, 43, 0.50) -2.24%, rgba(255, 255, 255, 0.50) 112.59%)",
                }}
            >
                <Image
                    src={Calculator}
                    sx={{
                        position: "absolute",
                        left: "0px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Text
                    sx={{
                        marginRight: "0.2604vw",
                        fontSize: "0.8333vw",
                        fontWeight: "bold",
                    }}
                >
                    Cosmertic Pt Calculator
                </Text>
                <Image
                    src={Arrow}
                    sx={{
                        width: "0.9375vw",
                    }}
                ></Image>
            </Box>
            <Text
                sx={{
                    fontSize: "1.0417vw",
                    lineHeight: "2.6042vw",
                }}
            >
                Playing games could earn mileage xp.For each game:
            </Text>{" "}
            <Text
                sx={{
                    fontSize: "1.0417vw",
                    lineHeight: "2.6042vw",
                }}
            >
                Mileage xp gained = Level x point transferred
            </Text>
        </Box>
    );
};

const MileageXp = () => {
    return (
        <Box sx={{}}>
            <Image src={MileageImg} sx={{}}></Image>
            <Text
                sx={{
                    fontSize: "1.0417vw",
                    marginTop: "37px",
                }}
            >
                Pilot earn mileage through playing games.
            </Text>
            <Text
                sx={{
                    fontSize: "1.0417vw",
                }}
            >
                For each game:{" "}
            </Text>
            <Text
                sx={{
                    fontSize: "1.0417vw",
                }}
            >
                Mileage gained = Level of aviation x point transferred{" "}
            </Text>
        </Box>
    );
};

const UpMercsBreeding = () => {
    return (
        <Box>
            <Image src={UpImg} sx={{}}></Image>
            <Text
                sx={{
                    fontSize: "1.0417vw",
                    marginTop: "60px",
                }}
            >
                Mercs have governance rights, can arbitrage, and would have a
                buff to estate score{" "}
            </Text>{" "}
        </Box>
    );
};

const NavItem = ({
    imgWidth,
    active,
    label,
    onClick,
    img,
    position,
}: {
    imgWidth: string;
    active: boolean;
    label: string;
    img: string;
    onClick: () => void;
    position: any;
}) => {
    return (
        <Box
            sx={{
                cursor: "pointer",
                position: "absolute",
                ...position,
                "&:hover": {
                    img: {
                        transform: "scale(1.2)",
                        transition: "all 0.3s ease",
                    },
                },
            }}
            onClick={onClick}
        >
            <Flex
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
                flexDir={"column"}
            >
                <Text
                    sx={{
                        color: "#fff",
                        fontSize: "32px",
                    }}
                >
                    {label}
                </Text>
                <Image
                    src={img}
                    sx={{
                        width: imgWidth,
                        marginTop: "10px",
                    }}
                ></Image>
            </Flex>
        </Box>
    );
};

const AttributeTab = ({
    value,
    tabList,
    handleTabChange,
}: {
    value: number;
    tabList: any;
    handleTabChange: (value: number) => void;
}) => {
    return (
        <Box>
            <Text
                sx={{
                    fontSize: "1.25vw",
                    fontWeight: "bold",
                }}
            >
                Detailed Rules
            </Text>
            <Flex
                justify={"center"}
                sx={{
                    marginTop: "120px",
                }}
            >
                <Box
                    sx={{
                        width: "1080px",
                        height: "432px",
                        background: `url(${CircleBg}) no-repeat`,
                        backgroundSize: "100% 100%",
                        position: "relative",
                    }}
                >
                    {tabList.map((item: any) => {
                        return (
                            <NavItem
                                onClick={() => {
                                    handleTabChange(item.value);
                                }}
                                key={item.value}
                                active={item.value === value}
                                label={item.label}
                                img={item.icon}
                                position={item.position}
                                imgWidth={item.imgWidth}
                            ></NavItem>
                        );
                    })}
                </Box>
            </Flex>
        </Box>
    );
};

interface TabItem {
    value: RuleTabEnum;
    label: string;
    icon: string;
    position: any;
    imgWidth: string;
}

const BttRules = () => {
    const [showTab, setShowTab] = useState(true);
    const navigate = useNavigate();
    const tabList: TabItem[] = [
        {
            value: RuleTabEnum.OVERAll,
            label: "Overall Structure",
            icon: PlanetIcon,
            position: {
                left: "140px",
                bottom: "0px",
            },
            imgWidth: "160px",
        },
        {
            value: RuleTabEnum.AVIATIONSYSTEM,
            label: "Aviation Lvl-Pt System",
            icon: PlaneIcon,
            position: {
                left: "30px",
                top: "10px",
            },
            imgWidth: "160px",
        },

        {
            value: RuleTabEnum.MILEAGEXP,
            label: "Mileage",
            icon: MileageIcon,
            position: {
                right: "40px",
                bottom: "80px",
            },
            imgWidth: "100px",
        },
        {
            value: RuleTabEnum.UPMERCSBREEDING,
            label: "Up & Mercs Breeding",
            icon: PilotIcon,
            position: {
                right: "110px",
                top: "30px",
                transform: "translateY(-50%)",
            },
            imgWidth: "160px",
        },
    ];
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (value: number) => {
        setCurrentTab(value);
        setShowTab(false);
    };

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "10vh",
                fontFamily: "Quantico",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    cursor: "pointer",
                }}
            >
                <Image src={GardenIcon}></Image>
                <Image
                    sx={{}}
                    src={BackIcon}
                    onClick={() => navigate("/home?step=2")}
                ></Image>
            </Box>
            <Box
                sx={{
                    width: "83.3333vw",
                    margin: "0 auto",
                    borderTop: "1px solid #fff",
                    paddingTop: "1.8519vh",
                }}
            >
                {showTab && (
                    <AttributeTab
                        handleTabChange={handleTabChange}
                        tabList={tabList}
                        value={currentTab}
                    ></AttributeTab>
                )}

                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "4.5313vw",
                            width: "52.0833vw",
                        }}
                    >
                        {/* {currentTab === RuleTabEnum.OVERAll && (
                            <OverallStructure></OverallStructure>
                        )}

                        {currentTab === RuleTabEnum.AVIATIONSYSTEM && (
                            <AviationSystem></AviationSystem>
                        )}

                        {currentTab === RuleTabEnum.XPPILOT && (
                            <XpPilot></XpPilot>
                        )}
                        {currentTab === RuleTabEnum.COSMETIC && (
                            <CosmeticXp></CosmeticXp>
                        )}
                        {currentTab === RuleTabEnum.MILEAGEXP && (
                            <MileageXp></MileageXp>
                        )}
                        {currentTab === RuleTabEnum.UPMERCSBREEDING && (
                            <UpMercsBreeding></UpMercsBreeding>
                        )} */}
                    </Box>
                </Box>
            </Box>
            {!showTab && (
                <Box
                    sx={{
                        width: "100%",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(13.2px)",
                    }}
                >
                    {currentTab === RuleTabEnum.OVERAll && (
                        <OverallStructure
                            onBack={() => {
                                setShowTab(true);
                            }}
                        ></OverallStructure>
                    )}
                    {currentTab === RuleTabEnum.AVIATIONSYSTEM && (
                        <AviationSystem
                            onBack={() => {
                                setShowTab(true);
                            }}
                        ></AviationSystem>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default BttRules;
