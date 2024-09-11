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
} from "@chakra-ui/react";
import CopyIcon from "@/assets/copy-icon.svg";
import QuitIcon from "./assets/quit.png";
import RightArrowIcon from "./assets/right-arrow.svg";
import DownArrowIcon from "./assets/down-arrow.png";
import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/utils";
import Blackrrow from "./assets/black-arrow.svg";
import NoPlane from "./assets/no-plane.png";
import DiscordIcon from "./assets/discord.png";
import TwIcon from "./assets/twitter.png";
import useSkyToast from "@/hooks/useSkyToast";
import PlaneBg from "./assets/plane-bg.png";
import { useUserInfo } from "@/contexts/UserInfo";
import BiddingGif from "@/assets/bidding.gif";
import TgIcon from "./assets/tg-icon.svg";
import { TG_URL } from "@/skyConstants/tgConfig";
import PilotBorder from "@/assets/pilot-border.png";
import { storeAccessToken } from "@/api/tournament";
import ExportIcon from "./assets/export-icon.svg";
import { avatarImg } from "@/utils/avatars";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const UserInfo = () => {
    const { user, exportWallet } = usePrivy();
    const toast = useSkyToast();
    const { tgInfo, address } = useUserInfo();
    const { onCopy } = useClipboard(address);

    return (
        <Flex flexDir={"column"} align={"center"}>
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
                            {`${shortenAddress(address, 4, 4)}`}
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
                            const shortAccessToken = res.data.shortAccessToken;
                            window.open(
                                `${TG_URL}?start=${shortAccessToken}`,
                                "_blank",
                            );
                        } catch (e: any) {
                            toast(e.data.message);
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
                {user?.wallet?.walletClientType === "privy" && (
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
                            exportWallet();
                        }}
                        align={"center"}
                        justify={"center"}
                    >
                        <Image
                            src={ExportIcon}
                            sx={{
                                marginRight: "4px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontSize: "12px",
                                color: "#1b1b1b",
                                marginRight: "5px",
                            }}
                        >
                            Export Embedded Wallet{" "}
                        </Text>
                    </Flex>
                )}
            </Flex>
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
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const { logout } = usePrivy();
    const { planeInit, planeList, tgInfo } = useUserInfo();

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

                    <Box>
                        <Flex
                            justify={"flex-end"}
                            align={"center"}
                            sx={{
                                height: "30px",
                            }}
                        >
                            <Image
                                onClick={async () => {
                                    await logout();
                                    localStorage.removeItem("tournamentToken");
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
                                src={tgInfo.photoUrl}
                                sx={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "50%",
                                }}
                            ></Image>
                        </Flex>
                        <UserInfo></UserInfo>
                        <MyPlane
                            planeList={planeList}
                            planeInit={planeInit}
                        ></MyPlane>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default UserInfoDrawer;
