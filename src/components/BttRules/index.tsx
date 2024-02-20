import {
    Box,
    Text,
    Image,
    Button,
    Flex,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import GardenIcon from "@/components/TacToe/assets/garden-icon.png";
import BackIcon from "@/components/TacToe/assets/back-arrow-home.svg";
import { useNavigate } from "react-router-dom";
import MileageImg from "./assets/mileage.png";
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
import Back from "../Back";

enum RuleTabEnum {
    OVERAll = 0,
    AVIATIONSYSTEM = 1,
    XPPILOT = 2,
    COSMETIC = 3,
    MILEAGEXP = 4,
    UPMERCSBREEDING = 5,
}

const OverallStructure = () => {
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

const AviationSystem = () => {
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

const MileageXp = () => {
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
                    fontWeight: "bold",
                }}
            >
                Mileage
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
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        padding: "50px 60px",
                    }}
                >
                    <Image src={MileageImg}></Image>
                </Flex>
                <Flex
                    flexDir={"column"}
                    sx={{
                        padding: "20px 0 20px 100px",
                        fontSize: "20px",
                    }}
                >
                    <Text>Pilot earn mileage through playing games.</Text>

                    <Text>For each game: </Text>
                    <Text>
                        Mileage gained =
                        <span
                            style={{
                                color: "#FDDC2D",
                            }}
                        >
                            Level of aviation
                        </span>{" "}
                        x{" "}
                        <span
                            style={{
                                color: "#FDDC2D",
                            }}
                        >
                            point transferred
                        </span>{" "}
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

const Up = () => {
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
                    fontWeight: "bold",
                }}
            >
                UP & Mercs breeding{" "}
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
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        padding: "50px 60px",
                    }}
                >
                    <Image src={UpImg}></Image>
                </Flex>
                <Flex
                    flexDir={"column"}
                    sx={{
                        padding: "20px 0 20px 100px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        Mercs have governance rights, can arbitrage, and would
                        have a buff to estate score{" "}
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

const NavItem = ({
    imgWidth,
    label,
    onClick,
    img,
    position,
}: {
    imgWidth: string;
    label: string;
    img: string;
    onClick: () => void;
    position: any;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                        fontSize: isPc ? "32px" : "12px",
                    }}
                >
                    {label}
                </Text>
                <Image
                    src={img}
                    sx={{
                        width: imgWidth,
                        marginTop: isPc ? "10px" : 0,
                    }}
                ></Image>
            </Flex>
        </Box>
    );
};

const AttributeTab = ({
    tabList,
    handleTabChange,
}: {
    tabList: any;
    handleTabChange: (value: number) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box>
            <Text
                sx={{
                    fontSize: isPc ? "1.25vw" : "16px",
                    fontWeight: "bold",
                }}
            >
                Detailed Rules
            </Text>
            <Flex
                justify={"center"}
                sx={{
                    marginTop: isPc ? "120px" : "150px",
                }}
            >
                <Box
                    sx={{
                        width: isPc ? "1080px" : "330px",
                        height: isPc ? "432px" : "132px",
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
                                label={item.label}
                                img={item.icon}
                                position={item.position}
                                imgWidth={isPc ? item.imgWidth : item.mImgWidth}
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
    mImgWidth: string;
}

const BttRules = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [showTab, setShowTab] = useState(true);
    const navigate = useNavigate();
    const tabList: TabItem[] = [
        {
            value: RuleTabEnum.OVERAll,
            label: "Overall Structure",
            icon: PlanetIcon,
            position: {
                left: "12%",
                bottom: "-10%",
            },
            imgWidth: "160px",
            mImgWidth: "80px",
        },
        {
            value: RuleTabEnum.AVIATIONSYSTEM,
            label: "Aviation Lvl-Pt System",
            icon: PlaneIcon,
            position: {
                left: "-4%",
                top: "-10%",
            },
            imgWidth: "160px",
            mImgWidth: "40px",
        },

        {
            value: RuleTabEnum.MILEAGEXP,
            label: "Mileage",
            icon: MileageIcon,
            position: {
                right: "4%",
                bottom: "16%",
            },
            imgWidth: "100px",
            mImgWidth: "40px",
        },
        {
            value: RuleTabEnum.UPMERCSBREEDING,
            label: "Up & Mercs Breeding",
            icon: PilotIcon,
            position: {
                right: "15%",
                top: "-15%",
            },
            imgWidth: "160px",
            mImgWidth: "50px",
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
                <Image
                    src={GardenIcon}
                    sx={{
                        width: isPc ? "80px" : "48px",
                    }}
                ></Image>
                <Image
                    sx={{
                        width: isPc ? "48px" : "32px",
                    }}
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
                    ></AttributeTab>
                )}
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
                    <Box
                        sx={{
                            position: "absolute",
                            left: "32px",
                            top: "32px",
                        }}
                    >
                        <Back
                            onClick={() => {
                                setShowTab(true);
                            }}
                        ></Back>
                    </Box>
                    {currentTab === RuleTabEnum.OVERAll && (
                        <OverallStructure></OverallStructure>
                    )}
                    {currentTab === RuleTabEnum.AVIATIONSYSTEM && (
                        <AviationSystem></AviationSystem>
                    )}{" "}
                    {currentTab === RuleTabEnum.MILEAGEXP && (
                        <MileageXp></MileageXp>
                    )}
                    {currentTab === RuleTabEnum.UPMERCSBREEDING && <Up></Up>}
                </Box>
            )}
        </Box>
    );
};

export default BttRules;
