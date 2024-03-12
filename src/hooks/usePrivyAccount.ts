import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { createWalletClient, custom } from "viem";

const usePrivyAccounts = () => {
    const { wallets } = useWallets();
    const { user, ready } = usePrivy();
    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState(null);
    console.log(wallets, "wallets");
    console.log(user, "user");

    useEffect(() => {
        const handleGetSigner = async () => {
            const userAddress = user.wallet.address;
            const wallet = wallets.find(
                (wallet) => wallet.address === userAddress,
            );
            if (!wallet) {
                setAddress("");
                setSigner(null);
                return;
            }
            setAddress(wallet.address);
            const provider = await wallet.getEthereumProvider();
            const walletClient = createWalletClient({
                chain: baseSepolia,
                transport: custom(provider),
                account: wallet.address as `0x${string}`,
            });

            setSigner(walletClient);
        };

        if (wallets.length === 0 || !user || !ready) {
            setAddress("");
            setSigner(null);
            return;
        }
        handleGetSigner();
    }, [wallets, user, ready]);

    return {
        signer,
        address,
    };
};

export default usePrivyAccounts;
