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
import { useLinkAccount, usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/utils";
import NoPlane from "./assets/no-plane.png";
import useSkyToast from "@/hooks/useSkyToast";
import PlaneBg from "./assets/plane-bg.png";
import { useUserInfo } from "@/contexts/UserInfo";
import BiddingGif from "@/assets/bidding.gif";
import TgIcon from "./assets/tg-icon.svg";
import ExportIcon from "./assets/export-icon.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { updateUserInfo } from "@/api/tournament";
import { avatarImg } from "@/utils/avatars";
import Avatar from "../Avatar";
import { LButton } from "../Button/Index";
import EthIcon from "@/assets/eth.png";
import InviteIcon from "./assets/invite.png";
import { formatAmount, toFixed } from "@/utils/formatBalance";

const UserInfo = ({ ethBalance }: { ethBalance: string }) => {
    const { address, setTgInfo } = useUserInfo();

    const { user, exportWallet } = usePrivy();

    const { linkTelegram } = useLinkAccount({
        onSuccess: async (user, linkMethod, linkedAccount) => {
            const res = await updateUserInfo();
            const { userInfo } = res.data;
            const info = {
                ...userInfo,
                photoUrl: userInfo.photoUrl
                    ? userInfo.photoUrl
                    : avatarImg(user.wallet.address),
            };

            setTgInfo(info);
        },
        onError: (error, details) => {
            console.log(error, details, "link account error");
            // Any logic you'd like to execute after a user exits the link flow or there is an error
        },
    });

    const toast = useSkyToast();
    const { onCopy } = useClipboard(address);
    const { onCopy: onCopyReferral } = useClipboard(
        `${window.location.host}/tower?referral=${address}`,
    );

    const handleInvite = async () => {
        onCopyReferral();
    };

    return (
        <Flex flexDir={"column"} align={"center"}>
            <Flex flexDir={"column"} align={"center"}>
                <Flex
                    sx={{
                        fontSize: "14px",
                        color: "#FFF",
                        marginTop: "8px",
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
                <Flex>
                    <Image
                        src={EthIcon}
                        sx={{
                            width: "14px",
                            marginRight: "2px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "32px",
                            fontStyle: "normal",
                            fontWeight: 700,
                        }}
                    >
                        {toFixed(formatAmount(ethBalance), 2)}
                    </Text>
                </Flex>
                <Box
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    {!user?.telegram && (
                        <LButton
                            sx={{
                                width: "180px",
                                height: "40px",
                                color: "#fff",
                            }}
                        >
                            {" "}
                            <Flex
                                sx={{}}
                                onClick={async () => {
                                    linkTelegram();
                                }}
                                align={"center"}
                                justify={"center"}
                            >
                                <Text
                                    sx={{
                                        fontSize: "12px",
                                        color: "#fff",
                                        marginRight: "5px",
                                    }}
                                >
                                    Connect Telegram
                                </Text>

                                <Image
                                    src={TgIcon}
                                    sx={{
                                        width: "20px",
                                    }}
                                ></Image>
                            </Flex>
                        </LButton>
                    )}
                    <LButton
                        sx={{
                            width: "180px",
                            height: "40px",
                            color: "#fff",
                        }}
                    >
                        <Flex
                            sx={{}}
                            onClick={handleInvite}
                            align={"center"}
                            justify={"center"}
                        >
                            <Image
                                src={InviteIcon}
                                sx={{
                                    width: "20px",
                                    marginRight: "6px",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: "12px",
                                    color: "#fff",
                                }}
                            >
                                Invite & Earn
                            </Text>
                        </Flex>
                    </LButton>
                    <Flex
                        justify={"space-between"}
                        sx={{
                            marginTop: "8px",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: "12px",
                                fontWeight: "700",
                            }}
                        >
                            Reward Earned
                        </Text>
                        <Flex>
                            <Image
                                src={EthIcon}
                                sx={{
                                    width: "6px",
                                }}
                            ></Image>
                            <Text></Text>
                        </Flex>
                    </Flex>
                    {user?.wallet?.walletClientType === "privy" && (
                        <Flex
                            sx={{
                                marginTop: "20px",
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
                                    color: "#fff",
                                }}
                            >
                                Export Embedded Wallet{" "}
                            </Text>
                        </Flex>
                    )}
                </Box>
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
    ethBalance,
    onClose,
    isOpen,
}: {
    ethBalance: string;
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
                        <Avatar
                            sx={{
                                width: "80px",
                                height: "80px",
                                margin: "0 auto",
                            }}
                        >
                            <Image
                                src={tgInfo.photoUrl}
                                sx={{
                                    width: "100%",
                                }}
                            ></Image>
                        </Avatar>
                        <UserInfo ethBalance={ethBalance}></UserInfo>
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
