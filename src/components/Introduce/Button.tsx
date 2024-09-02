import { Button, ButtonProps, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactComponent as LBorder } from "./assets/l-border.svg";
import { ReactComponent as RBorder } from "./assets/r-border.svg";

const BlackButtonStyle = styled(Button)`
    background-color: #161616;
    font-size: 18px;
    font-weight: 700;
    font-family: Orbitron;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        color: #ffdb24;
    }
    &:focus {
        box-shadow: none;
    }
`;

export const BlackButton = (props: ButtonProps) => {
    return (
        <BlackButtonStyle variant={"unstyled"} {...props}>
            {props.children}
            <LBorder
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "40%",
                    width: "auto",
                }}
            ></LBorder>
            <RBorder
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    height: "40%",
                    width: "auto",
                }}
            ></RBorder>
        </BlackButtonStyle>
    );
};
