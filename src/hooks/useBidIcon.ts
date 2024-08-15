import { useMemo } from "react";
import { UserMarkIcon, UserMarkIcon1 } from "@/skyConstants/bttGameTypes";
import { useBidIconContext } from "@/contexts/BidIcon";

const useBidIcon = () => {
    const { bidIconType } = useBidIconContext();

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
