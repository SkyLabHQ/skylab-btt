import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { createWalletClient, custom } from "viem";

const usePrivyAccounts = () => {
    const { ready, wallets } = useWallets();
    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        const handleGetSigner = async () => {
            if (wallets.length === 0) {
                setAddress("");
                setSigner(null);
                return;
            }
            const wallet = wallets[0];
            setAddress(wallet.address);
            const provider = await wallet.getEthereumProvider();
            const walletClient = createWalletClient({
                chain: baseSepolia,
                transport: custom(provider),
                account: wallet.address as `0x${string}`,
            });

            setSigner(walletClient);
        };

        if (wallets.length === 0 || !ready) {
            setAddress("");
            setSigner(null);
            return;
        }
        handleGetSigner();
    }, [wallets, ready]);

    return {
        signer,
        address,
    };
};

export default usePrivyAccounts;
