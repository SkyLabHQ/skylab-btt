import { isAddress } from "@ethersproject/address";

export const shortenAddress = (
    address: string,
    firstChars = 5,
    lastChars = 4,
): string => {
    const parsed = isAddress(address);
    if (!parsed) return "";
    return `${address.substring(0, firstChars)}...${address.substring(
        42 - lastChars,
    )}`;
};

export const shortenAddressWithout0x = (
    address: string,
    firstChars = 5,
    lastChars = 4,
): string => {
    const parsed = isAddress(address);
    if (!parsed) return "";

    return address.substring(2, firstChars) + address.slice(-lastChars);
};
