import { Box, Image } from "@chakra-ui/react";
import Close from "./assets/close.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const SkyToast = ({
    message,
    onClose,
    isCloseAble,
}: {
    message: string;
    onClose?: () => void;
    isCloseAble?: boolean;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box
            color="white"
            p={3}
            bg="#ABABAB"
            borderRadius="20px"
            fontSize={isPc ? "1.5625vw" : "16px"}
            sx={{
                maxWidth: isPc ? "40vw" : "300px",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                breakword: "break-all",
                position: "relative",
                zIndex: 10001,
                maxHeight: "118px",
                overflow: "hidden",
            }}
        >
            {message}
            {isCloseAble && (
                <Image
                    src={Close}
                    sx={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                        width: "20px",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                ></Image>
            )}
        </Box>
    );
};

export default SkyToast;
