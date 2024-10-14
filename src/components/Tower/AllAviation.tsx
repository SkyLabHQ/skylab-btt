import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import RArrowIcon from "./assets/r-arrow.svg";
import Paper from "./assets/paper.png";
import { aviationImg } from "@/utils/aviationImg";
import { ReactComponent as LevelBorder } from "./assets/level-border.svg";
import CountDownIcon from "./assets/countdown.svg";
import LockIcon from "./assets/lock.svg";
import { Newcomer } from ".";
import Countdown from "react-countdown";
import leagueConfigList, { League, leagueBg } from "@/utils/league";
import VideoComponent from "../Video";
import WhiteBg from "@/assets/league/white.webm";

const renderer = ({
    formatted,
}: {
    formatted: {
        minutes: string;
        seconds: string;
    };
}) => {
    return (
        <span>
            {formatted.minutes}:{formatted.seconds}
        </span>
    );
};

const Aviation = ({
    config,
    newcomer,
    index,
}: {
    config: any;
    newcomer: Newcomer;
    index: number;
}) => {
    const isLock = newcomer.newComerId == 0;
    return (
        <Flex
            sx={{
                height: "100%",
            }}
            align={"center"}
        >
            <Flex
                sx={{
                    width: "182px",
                    height: "182px",
                    borderRadius: "50%",
                    marginRight: "40px",
                    position: "relative",
                    opacity: isLock ? "0.5" : 1,
                }}
                align={"center"}
                justify={"center"}
            >
                <VideoComponent
                    url={
                        leagueBg[newcomer.leader]
                            ? leagueBg[newcomer.leader]
                            : leagueBg[League.WHITE]
                    }
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "360px",
                        height: "360px",
                    }}
                ></VideoComponent>

                <Image
                    src={aviationImg(index + 1)}
                    sx={{
                        width: "60p%",
                        height: "60%",
                    }}
                ></Image>
                {isLock && (
                    <Image
                        src={LockIcon}
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "45px",
                        }}
                    ></Image>
                )}
                <LevelBorder
                    style={{
                        color: config ? config.color : "#fff",
                        position: "absolute",
                        left: "80%",
                        top: "-20px",
                        width: "80px",
                    }}
                ></LevelBorder>
                <Text
                    sx={{
                        position: "absolute",
                        left: "85%",
                        top: "-34px",
                        width: "90px",
                        textAlign: "center",
                    }}
                >
                    Lvl.{" "}
                    <span
                        style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                        }}
                    >
                        {index + 1}
                    </span>
                </Text>
                {!isLock && (
                    <>
                        <Image
                            sx={{
                                position: "absolute",
                                left: "70%",
                                bottom: "-80px",
                                width: "180px",
                            }}
                            src={CountDownIcon}
                        ></Image>
                        <Box
                            sx={{
                                position: "absolute",
                                right: "-130px",
                                bottom: "-80px",
                                width: "120px",
                                textAlign: "center",
                                fontSize: "34px",
                            }}
                        >
                            {newcomer.claimTIme > 0 && (
                                <Countdown
                                    zeroPadTime={2}
                                    date={newcomer.claimTIme * 1000}
                                    renderer={renderer}
                                />
                            )}
                        </Box>
                    </>
                )}
            </Flex>
            {index !== 15 && <Image src={RArrowIcon}></Image>}
        </Flex>
    );
};

const AllAviation = ({ newcomerList }: { newcomerList: Newcomer[] }) => {
    return (
        <Swiper
            style={{
                width: "100%",
                position: "relative",
                height: "380px",
            }}
            centeredSlides={true}
            slidesPerView={"auto"}
        >
            <SwiperSlide
                style={{
                    color: "#fff",
                    textAlign: "center",
                    width: "400px",
                }}
            >
                <Flex
                    sx={{
                        height: "100%",
                    }}
                    align={"center"}
                >
                    <Flex
                        sx={{
                            width: "182px",
                            height: "182px",
                            borderRadius: "50%",
                            marginRight: "40px",
                            position: "relative",
                        }}
                        align={"center"}
                        justify={"center"}
                    >
                        <VideoComponent
                            url={WhiteBg}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "360px",
                                height: "360px",
                            }}
                        ></VideoComponent>
                        <Image
                            src={Paper}
                            sx={{
                                width: "60%",
                                height: "60%",
                            }}
                        ></Image>
                    </Flex>
                    <Image src={RArrowIcon}></Image>
                </Flex>
            </SwiperSlide>
            {newcomerList.map((item, index) => {
                const config = leagueConfigList.find((lItem) => {
                    return lItem.leader == item.leader;
                });
                return (
                    <SwiperSlide
                        key={index}
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            width: "400px",
                        }}
                    >
                        <Aviation
                            newcomer={item}
                            index={index}
                            config={config}
                        ></Aviation>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default AllAviation;
