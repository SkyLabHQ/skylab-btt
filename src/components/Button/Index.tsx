import { Button, ButtonProps, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactComponent as LbIcon } from "@/assets/l-b.svg";
import { ReactComponent as RbIcon } from "@/assets/r-b.svg";

const PrimaryButtonStyle = styled(Button)`
    &:hover {
        box-shadow: 0px 4px 4px #fbc53e;
    }
`;

export const PrimaryButton = (props: ButtonProps) => {
    return (
        <PrimaryButtonStyle
            variant={"unstyled"}
            {...props}
        ></PrimaryButtonStyle>
    );
};

export const LButton = (
    props: ButtonProps & {
        bColor?: string;
    },
) => {
    const { sx, bColor = "#fff", children, ...rest } = props;
    return (
        <Button
            variant={"unstyled"}
            sx={{
                height: "40px",
                width: "64px",
                border: "1px solid",
                borderColor: "#3c3c3c",
                borderRadius: "0px",
                "&:hover": {
                    borderColor: "#F2D861",
                    svg: {
                        color: "#F2D861",
                    },
                },

                ...sx,
            }}
            {...rest}
        >
            <LbIcon
                style={{
                    position: "absolute",
                    left: "-2px",
                    top: "-2px",
                }}
            ></LbIcon>
            <RbIcon
                style={{
                    position: "absolute",
                    right: "-2px",
                    bottom: "-2px",
                }}
            ></RbIcon>
            {children}
        </Button>
    );
};
