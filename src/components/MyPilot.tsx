import { Box, BoxProps, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import PilotBorder from "@/assets/pilot-border.png";
import UserIcon from "@/assets/user-icon.png";
import { useUserInfoRequest } from "@/contexts/UserInfo";

const PilotStyle = styled(Box)`
    background: url(${PilotBorder}) no-repeat;
    background-size: contain;
    padding: 10px;
`;
const MyPilot = ({ width = "40px", ...props }: BoxProps) => {
    const { activePilot } = useUserInfoRequest();
    return (
        <PilotStyle {...props} width={width} height={width}>
            <Image
                src={activePilot?.img ? activePilot.img : UserIcon}
                sx={{
                    borderRadius: "50%",
                }}
            ></Image>
        </PilotStyle>
    );
};

export default MyPilot;
