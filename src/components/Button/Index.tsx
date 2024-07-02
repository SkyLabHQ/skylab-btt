import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

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
