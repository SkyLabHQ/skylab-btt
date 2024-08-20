import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    Text,
    Image,
    DrawerOverlay,
    Flex,
    SimpleGrid,
    useClipboard,
    useMediaQuery,
    SkeletonCircle,
    Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import CopyIcon from "@/assets/copy-icon.svg";
import QuitIcon from "./assets/quit.png";
import RightArrowIcon from "./assets/right-arrow.svg";
import DownArrowIcon from "./assets/down-arrow.png";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { shortenAddress } from "@/utils";
import Blackrrow from "./assets/black-arrow.svg";
import NoPlane from "./assets/no-plane.png";
import DiscordIcon from "./assets/discord.png";
import TwIcon from "./assets/twitter.png";
import EditNickname from "./EditNickname";
import useSkyToast from "@/hooks/useSkyToast";
import PlaneBg from "./assets/plane-bg.png";
import SetNameIcon from "./assets/setName.png";
import { useUserInfo } from "@/contexts/UserInfo";
import BiddingGif from "@/assets/bidding.gif";
import TgIcon from "./assets/tg-icon.svg";
import { TG_URL } from "@/skyConstants/tgConfig";
import PilotBorder from "@/assets/pilot-border.png";
import UserIcon from "@/assets/user-icon.png";
import { storeAccessToken } from "@/api/tournament";

const UserInfo = ({
    userName,
    userNameInit,
}: {
    userName: string;
    userNameInit: boolean;
}) => {
    const { user } = usePrivy();
    const { address } = usePrivyAccounts();
    const toast = useSkyToast();
    const { onCopy } = useClipboard(address);

    return (
        <Flex flexDir={"column"} align={"center"}>
            {userNameInit ? (
                <Flex flexDir={"column"} align={"center"}>
                    <Flex
                        sx={{
                            marginTop: "8px",
                        }}
                        align={"center"}
                    >
                        {user?.discord && (
                            <Image
                                src={DiscordIcon}
                                sx={{
                                    width: "16px",
                                    marginRight: "4px",
                                }}
                            ></Image>
                        )}
                        {user?.twitter && (
                            <Image
                                src={TwIcon}
                                sx={{
                                    width: "16px",
                                    marginRight: "4px",
                                }}
                            ></Image>
                        )}
                        <Flex
                            sx={{
                                fontSize: "14px",
                                color: "#F2D861",
                            }}
                            onClick={() => {
                                onCopy();
                                toast("Address copied");
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: "14px",
                                    marginRight: "11px",
                                }}
                            >
                                {userName
                                    ? userName
                                    : `${shortenAddress(address, 4, 4)}`}
                            </Text>
                            <Image
                                src={CopyIcon}
                                sx={{
                                    width: "14px",
                                }}
                            ></Image>
                        </Flex>
                    </Flex>
                    <Flex
                        sx={{
                            borderRadius: "12px",
                            background: "#F2D861",
                            height: "40px",
                            width: "180px",
                            paddingLeft: "8px",
                            marginTop: "15px",
                            cursor: "pointer",
                        }}
                        onClick={async () => {
                            try {
                                const res = await storeAccessToken();
                                const shortAccessToken =
                                    res.data.shortAccessToken;
                                window.open(
                                    `${TG_URL}?start=${shortAccessToken}`,
                                    "_blank",
                                );
                            } catch (e: any) {
                                toast(e.message);
                            }
                        }}
                        align={"center"}
                        justify={"center"}
                    >
                        <Text
                            sx={{
                                fontSize: "12px",
                                color: "#1b1b1b",
                                marginRight: "5px",
                            }}
                        >
                            Link to TG
                        </Text>
                        <Image
                            src={Blackrrow}
                            sx={{
                                marginRight: "15px",
                            }}
                        ></Image>
                        <Image
                            src={TgIcon}
                            sx={{
                                width: "28px",
                                maxWidth: "28px",
                            }}
                        ></Image>
                    </Flex>
                </Flex>
            ) : (
                <Box
                    sx={{
                        marginTop: "8px",
                    }}
                >
                    <Flex align={"center"}>
                        <SkeletonCircle
                            size="5"
                            startColor="#FDDC2D"
                            endColor="#fff"
                            sx={{
                                marginRight: "10px",
                            }}
                        />
                        <Skeleton
                            startColor="#FDDC2D"
                            endColor="#fff"
                            height="10px"
                            width={"100px"}
                        />
                    </Flex>
                    <Skeleton
                        startColor="#FDDC2D"
                        endColor="#fff"
                        height="10px"
                        width={"100%"}
                        sx={{
                            marginTop: "8px",
                        }}
                    />
                </Box>
            )}
        </Flex>
    );
};

const PlaneItem = ({ detail }: { detail: any }) => {
    return (
        <Flex flexDir={"column"} align={"center"}>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    background: `url(${PlaneBg}) no-repeat`,
                    backgroundSize: "100% 100%",
                    position: "relative",
                }}
            >
                <Image
                    src={detail.img}
                    sx={{
                        width: "180%",
                        maxWidth: "180%",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                ></Image>
            </Box>
            <Text
                sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                }}
            >
                Lvl.{" "}
                <span
                    style={{
                        fontSize: "16px",
                    }}
                >
                    {detail.level}
                </span>
            </Text>
            <Box
                sx={{
                    width: "70px",
                    height: "7px",
                    padding: "1px",
                    border: "1px solid #FFF",
                    borderRadius: "5px",
                }}
            >
                <Box
                    sx={{
                        width:
                            ((detail.points - detail.prePoints) /
                                (detail.nextPoints - detail.prePoints)) *
                                100 +
                            "%",
                        height: "100%",
                        background: "#fff",
                    }}
                ></Box>
            </Box>
            <Text
                sx={{
                    fontSize: "12px",
                }}
            >
                Next Lvl:
            </Text>
            <Text
                sx={{
                    fontSize: "12px",
                }}
            >
                {detail.points}/
                <span
                    style={{
                        color: "#CCC",
                    }}
                >
                    {detail.nextPoints}pt
                </span>
            </Text>
        </Flex>
    );
};

const MyPlane = ({
    planeList,
    planeInit,
}: {
    planeList: any[];
    planeInit: boolean;
}) => {
    return (
        <Box
            sx={{
                marginTop: "30px",
            }}
        >
            <Box
                sx={{
                    borderBottom: "1px dashed  #fff",
                    paddingBottom: "8px",
                }}
            >
                <Text
                    sx={{
                        fontFamily: "Orbitron",
                        fontSize: "18px",
                    }}
                >
                    Plane
                </Text>
            </Box>

            <Box
                sx={{
                    paddingTop: "48px",
                }}
            >
                {planeInit ? (
                    <Box>
                        {planeList.length > 0 ? (
                            <SimpleGrid
                                columns={3}
                                spacingY={"20px"}
                                spacingX={"10px"}
                            >
                                {planeList.map((item, index) => {
                                    return (
                                        <PlaneItem
                                            detail={item}
                                            key={index}
                                        ></PlaneItem>
                                    );
                                })}
                            </SimpleGrid>
                        ) : (
                            <Flex flexDir={"column"} align={"center"}>
                                <Image
                                    src={NoPlane}
                                    sx={{
                                        width: "140px",
                                    }}
                                ></Image>
                            </Flex>
                        )}
                    </Box>
                ) : (
                    <SimpleGrid columns={3} spacingY={"10px"}>
                        {new Array(3).fill("").map((item, index) => {
                            return (
                                <Flex
                                    sx={{
                                        position: "relative",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                    key={index}
                                >
                                    <Image
                                        src={BiddingGif}
                                        sx={{ width: "50px", height: "50px" }}
                                    ></Image>
                                </Flex>
                            );
                        })}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
};

const UserInfoDrawer = ({
    onClose,
    isOpen,
    onUserNameChange,
}: {
    isOpen: boolean;
    onClose: () => void;
    onUserNameChange: (name: string) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { logout } = usePrivy();
    const [currentMode, setCurrentMode] = useState(0); // 0展示用户信息 1设置昵称
    const { planeInit, planeList, userName, userNameInit, tgInfo } =
        useUserInfo();

    const handleChangeMode = (mode: number) => {
        setCurrentMode(mode);
    };

    return (
        <Drawer
            placement={isPc ? "right" : "bottom"}
            onClose={onClose}
            isOpen={isOpen}
        >
            <DrawerOverlay />
            <DrawerContent
                sx={{
                    borderRadius: "20px",
                    border: "1px solid #F2D861",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(25px)",
                    position: "relative",
                    maxWidth: "375px",
                    height: "100%",
                }}
            >
                <DrawerBody
                    sx={{
                        padding: "30px",
                        width: "100% !important",
                        height: "100%",
                    }}
                >
                    {isPc ? (
                        <Image
                            src={RightArrowIcon}
                            sx={{
                                width: "24px",
                                top: "40px",
                                left: "-36px",
                                position: "absolute",
                            }}
                            onClick={onClose}
                        ></Image>
                    ) : (
                        <Flex justify={"center"}>
                            <Image
                                onClick={onClose}
                                src={DownArrowIcon}
                            ></Image>
                        </Flex>
                    )}

                    {currentMode === 0 && (
                        <Box>
                            <Flex
                                justify={"flex-end"}
                                align={"center"}
                                sx={{
                                    height: "30px",
                                }}
                            >
                                <Image
                                    src={SetNameIcon}
                                    sx={{
                                        width: "24px",
                                        marginRight: "12px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        handleChangeMode(1);
                                    }}
                                ></Image>
                                <Image
                                    onClick={async () => {
                                        await logout();
                                        onClose();
                                    }}
                                    src={QuitIcon}
                                    sx={{
                                        width: "24px",
                                        cursor: "pointer",
                                    }}
                                ></Image>
                            </Flex>
                            <Flex
                                sx={{
                                    width: "80px",
                                    height: "80px",
                                    background: `url(${PilotBorder}) no-repeat`,
                                    backgroundSize: "cover",
                                    margin: "0 auto",
                                }}
                                align={"center"}
                                justify={"center"}
                            >
                                <Image
                                    src={UserIcon}
                                    sx={{
                                        width: "56px",
                                        height: "56px",
                                    }}
                                ></Image>
                            </Flex>
                            <UserInfo
                                userName={userName}
                                userNameInit={userNameInit}
                            ></UserInfo>

                            <MyPlane
                                planeList={planeList}
                                planeInit={planeInit}
                            ></MyPlane>
                        </Box>
                    )}
                    {currentMode === 1 && (
                        <EditNickname
                            onSetUserName={(userName: string) => {
                                onUserNameChange(userName);
                            }}
                            onChangeMode={(mode: number) => {
                                handleChangeMode(mode);
                            }}
                        ></EditNickname>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default UserInfoDrawer;
