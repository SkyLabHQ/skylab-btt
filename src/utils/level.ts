export function getLevel(point: number) {
    for (let i = 0; i < levelRanges.length; i++) {
        if (
            point < levelRanges[i].maxPoints &&
            point >= levelRanges[i].minPoints
        ) {
            return levelRanges[i].level; // 返回等级，从1开始
        }
    }
    return 0;
}

export const levelRanges = [
    { level: 0, minPoints: 0, maxPoints: 1 },
    { level: 1, minPoints: 1, maxPoints: 2 },
    { level: 2, minPoints: 2, maxPoints: 4 },
    { level: 3, minPoints: 4, maxPoints: 8 },
    { level: 4, minPoints: 8, maxPoints: 16 },
    { level: 5, minPoints: 16, maxPoints: 32 },
    { level: 6, minPoints: 32, maxPoints: 64 },
    { level: 7, minPoints: 64, maxPoints: 128 },
    { level: 8, minPoints: 128, maxPoints: 256 },
    { level: 9, minPoints: 256, maxPoints: 512 },
    { level: 10, minPoints: 512, maxPoints: 1024 },
    { level: 11, minPoints: 1024, maxPoints: 2048 },
    { level: 12, minPoints: 2048, maxPoints: 4096 },
    { level: 13, minPoints: 4096, maxPoints: 8192 },
    { level: 14, minPoints: 8192, maxPoints: 16384 },
    { level: 15, minPoints: 16384, maxPoints: 32768 },
    { level: 16, minPoints: 32768, maxPoints: 1000000 },
];

export const getLevelInfo = (point: number) => {
    for (let i = 0; i < levelRanges.length; i++) {
        if (
            point < levelRanges[i].maxPoints &&
            point >= levelRanges[i].minPoints
        ) {
            return levelRanges[i]; // 返回等级，从1开始
        }
    }
};
