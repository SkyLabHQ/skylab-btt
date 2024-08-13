import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { createWalletClient, custom } from "viem";

const usePrivyAccounts = () => {
    const { wallets } = useWallets();
    const { user, ready } = usePrivy();

    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        const handleGetSigner = async () => {
            if (wallets.length === 0) {
                setAddress("");
                setSigner(null);
                return;
            }

            const wallet = wallets.find((item) => {
                return item.address === user.wallet.address;
            });

            if (!wallet) {
                return;
            }

            setAddress(user.wallet.address);

            const provider = await wallet.getEthereumProvider();
            const walletClient = createWalletClient({
                chain: baseSepolia,
                transport: custom(provider),
                account: wallet.address as `0x${string}`,
            });

            setSigner(walletClient);
        };
        console.log(user, wallets);

        if (wallets.length === 0 || !ready || !user) {
            setAddress("");
            setSigner(null);
            return;
        }
        handleGetSigner();
    }, [wallets, ready, user]);

    return {
        signer,
        address,
    };
};

export default usePrivyAccounts;
