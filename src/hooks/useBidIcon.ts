import { useUserInfo } from "@/contexts/UserInfo";
import { useMemo } from "react";
import { UserMarkIcon, UserMarkIcon1 } from "@/skyConstants/bttGameTypes";

const useBidIcon = () => {
    const { bidIconType } = useUserInfo();

    const MarkIcon = useMemo(() => {
        if (bidIconType === "0") {
            return UserMarkIcon;
        } else {
            return UserMarkIcon1;
        }
    }, [bidIconType]);

    return MarkIcon;
};

export default useBidIcon;
