import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { useChainId } from "wagmi";
import { useUserInfo } from "@/contexts/UserInfo";

export const useGridCommited = (tokenId: number | string, grid: number) => {
    const chainId = useChainId();
    const getGridCommited = useCallback(() => {
        if (!tokenId || !chainId || grid === -1) {
            return "";
        }
        let stringSalt = localStorage.getItem("bttCommited");
        let objSalt;
        try {
            objSalt = stringSalt ? JSON.parse(stringSalt) : {};
        } catch (e) {
            objSalt = {};
        }
        const key = chainId + "-" + tokenId;
        if (!objSalt[key]) {
            return "";
        }
        return objSalt[key][grid];
    }, [tokenId, chainId, grid]);

    const addGridCommited = useCallback(
        (amount: number, salt: number, status: boolean) => {
            if (!tokenId || !chainId || grid === -1 || !salt) {
                return false;
            }
            let stringSalt = localStorage.getItem("bttCommited");
            let objSalt;
            try {
                objSalt = stringSalt ? JSON.parse(stringSalt) : {};
            } catch (e) {
                objSalt = {};
            }
            const key = chainId + "-" + tokenId;
            if (!objSalt[key]) {
                objSalt[key] = {};
            }
            if (objSalt[key]?.[grid]?.status == "true") {
                return;
            }
            objSalt[key][grid] = {
                salt,
                amount,
                status,
            };
            localStorage.setItem("bttCommited", JSON.stringify(objSalt));
            return true;
        },
        [tokenId, chainId, grid],
    );

    return {
        getGridCommited,
        addGridCommited,
    };
};

export const useDeleteTokenIdCommited = (tokenId: number | string) => {
    const chainId = useChainId();
    const deleteTokenIdCommited = useCallback(() => {
        if (!tokenId || !chainId) {
            return null;
        }
        let stringSalt = localStorage.getItem("bttCommited");
        let objSalt;
        try {
            objSalt = stringSalt ? JSON.parse(stringSalt) : {};
        } catch (e) {
            objSalt = {};
        }
        const key = chainId + "-" + tokenId;
        if (objSalt[key]) {
            delete objSalt[key];
            localStorage.setItem("bttCommited", JSON.stringify(objSalt));
        }
    }, [tokenId, chainId]);

    return deleteTokenIdCommited;
};

export const useAddBttTransaction = (tokenId: number) => {
    const chainId = useChainId();
    const { search } = useLocation();

    const params = qs.parse(search) as any;
    const istest = params.testflight === "true";
    return useCallback(
        ({
            account,
            burner,
            gameAddress,
            oldLevel,
            newLevel,
            oldPoint,
            newPoint,
            win,
        }: {
            account: string;
            burner: string;
            gameAddress: string;
            oldLevel: number;
            newLevel: number;
            oldPoint: number;
            newPoint: number;
            win: boolean;
        }) => {
            if (!tokenId || !chainId || istest) {
                return null;
            }

            const time = new Date().getTime();
            let stringRecord = localStorage.getItem("bttRecords");
            let objRecord;
            try {
                objRecord = stringRecord ? JSON.parse(stringRecord) : {};
            } catch (e) {
                objRecord = {};
            }
            const records = objRecord[chainId] ?? {};
            records[gameAddress] = {
                chainId,
                burner,
                account,
                tokenId,
                time,
                gameAddress,
                oldLevel,
                newLevel,
                oldPoint,
                newPoint,
                win,
            };
            objRecord[chainId] = records;
            localStorage.setItem("bttRecords", JSON.stringify(objRecord));
        },
        [tokenId, chainId],
    );
};

export const useAllBttTransaction = () => {
    const chainId = useChainId();
    const { address } = useUserInfo();

    return useMemo(() => {
        if (!chainId || !address) {
            return [];
        }

        let stringRecord = localStorage.getItem("bttRecords");
        let objRecord;
        try {
            objRecord = stringRecord ? JSON.parse(stringRecord) : {};
        } catch (e) {
            objRecord = {};
        }
        const records = objRecord[chainId] ?? {};
        objRecord[chainId] = records;
        const myRecords = Object.keys(records)
            .map((item) => {
                return records[item];
            })
            .filter((item) => {
                return item.account === address || item.from === address;
            })
            .reverse();
        return myRecords;
    }, [address, chainId]);
};
