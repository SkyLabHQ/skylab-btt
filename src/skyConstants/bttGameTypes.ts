import Merc1 from "./emotes/1.png";
import Merc2 from "./emotes/2.png";
import Merc3 from "./emotes/3.png";
import Merc4 from "./emotes/4.png";
import Merc5 from "./emotes/5.png";
import Merc6 from "./emotes/6.png";
import Merc7 from "./emotes/7.png";
import Merc8 from "./emotes/8.png";
import Merc9 from "./emotes/9.png";
import Merc10 from "./emotes/10.png";

import CircleIcon from "@/components/TacToe/assets/circle.svg";
import CrossIcon from "@/components/TacToe/assets/x.svg";
import YellowCircle from "@/components/TacToe/assets/yellow-circle.svg";
import YellowCross from "@/components/TacToe/assets/yellow-x.svg";
import BotX from "@/components/TacToe/assets/bot-x.svg";
import YellowBotX from "@/components/TacToe/assets/yellow-bot-x.svg";

export enum GameState {
    Unknown = 0,
    WaitingForBid = 1,
    Commited = 2,
    Revealed = 3,
    WinByConnecting = 4,
    LoseByConnecting = 5,
    WinByTimeout = 6,
    LoseByTimeout = 7,
    WinBySurrender = 8,
    LoseBySurrender = 9,
    WinByGridCount = 10,
    LoseByGridCount = 11,
}

export enum MessageStatus {
    Unknown = 0,
    Sending = 1,
    Sent = 2,
}

export const getWinState = (gameState: GameState) => {
    return [
        GameState.WinByConnecting,
        GameState.WinByGridCount,
        GameState.WinBySurrender,
        GameState.WinByTimeout,
    ].includes(gameState);
};

export const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // 横排
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // 竖排
    [0, 4, 8],
    [2, 4, 6], // 对角线
];

export const MESSAGES = [
    "I really need the grid.",
    "I do not want this grid.",
    "I would bid really high.",
    "I would bid really low.",
    "I have so many ways to win.",
];

export const MERCS = [
    Merc1,
    Merc2,
    Merc3,
    Merc4,
    Merc5,
    Merc6,
    Merc7,
    Merc8,
    Merc9,
    Merc10,
];

export const EMOTES = ["🥱", "🤔", "🤯", "😭", "🥺", "🤩", "🥳"];

export enum UserMarkType {
    Empty = -1,
    Square = 0,
    Circle = 1,
    Cross = 2,
    YellowCircle = 3,
    YellowCross = 4,
    BotX = 5,
    YellowBotX = 6,
}

export const UserMarkIcon = {
    Circle: CircleIcon,
    Cross: CrossIcon,
    YellowCircle: YellowCircle,
    YellowCross: YellowCross,
    BotX: BotX,
    YellowBotX: YellowBotX,
};

export const initBoard = () => {
    return Array(9)
        .fill("")
        .map(() => ({
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Empty,
            opMark: UserMarkType.Empty,
        }));
};

export interface BoardItem {
    mark: UserMarkType;
    myValue: number;
    opValue: number;
    myMark: UserMarkType;
    opMark: UserMarkType;
    showAnimate?: boolean;
}

// user state in game
export interface GameInfo {
    balance: number;
    gameState: number;
    timeout: number;
    message: number;
    emote: number;
}

const winEmoji = ["❤️", "👑", "🦋", "🌻", "🥳", "🤪", "😎", "🤭", "🤩"];
const loseEmoji = ["🥀", "💔", "🥲", "🥶", "🤬", "🥺", "🤕", "☠️"];

export const getShareEmoji = (
    myMark: UserMarkType,
    list: BoardItem[],
    win: boolean,
) => {
    const emojiList = win
        ? winEmoji.sort(() => Math.random() - 0.5).slice(0, 3)
        : loseEmoji.sort(() => Math.random() - 0.5).slice(0, 3);
    const gridSize = 3; // 九宫格的大小，这里是3x3

    const mark = myMark === UserMarkType.Circle ? "⭕️" : "❌";
    let gridString = "";

    for (let i = 0; i < gridSize; i++) {
        gridString += `${mark}       `;
        for (let j = 0; j < gridSize; j++) {
            const index = i * gridSize + j;
            const cellValue =
                list[index].mark === UserMarkType.Empty
                    ? "◻️"
                    : list[index].mark === UserMarkType.Circle ||
                      list[index].mark === UserMarkType.YellowCircle
                    ? "⭕️"
                    : "❌";
            gridString += cellValue;
        }
        gridString += `     ${mark}`; // 在每行末尾添加换行符
        if (i !== gridSize - 1) {
            gridString += "\n";
        }
    }

    const border = `${mark}                             ${mark}`;

    return `${mark}${mark}${emojiList.join("")}${mark}${mark}
${border}
${gridString}
${border}
${mark}${mark}${emojiList.join("")}${mark}${mark}
@skylabHQ
https://app.projmercury.io/btt`;
};

export const SixtySecond = 60 * 1000;
export const ThirtySecond = 30 * 1000;
