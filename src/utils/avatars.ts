export const avatarImg = (address: string) => {
    if (!address) {
        return;
    }
    const lastFour = String(address).slice(-4);
    const num1 = parseInt(lastFour, 16) % 20;
    const url = require(`@/assets/avatars/Pixel-80-${num1}.svg`);
    return url;
};
