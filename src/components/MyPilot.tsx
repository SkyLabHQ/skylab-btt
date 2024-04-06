import { Box, BoxProps, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import PilotBorder from "@/assets/pilot-border.png";
import UserIcon from "@/assets/user-icon.png";

const PilotStyle = styled(Box)`
    background: url(${PilotBorder}) no-repeat;
    background-size: contain;
    padding: 6px;
`;
const MyPilot = ({
    width = "40px",
    imgUrl,
    ...props
}: BoxProps & { imgUrl: string }) => {
    return (
        <PilotStyle {...props} width={width} height={width}>
            <Image
                src={imgUrl ? imgUrl : UserIcon}
                sx={{
                    borderRadius: "50%",
                }}
            ></Image>
        </PilotStyle>
    );
};

export default MyPilot;
