import Robot from "@/components/BttComponents/assets/robot.png";
import CircleIcon from "@/components/TacToe/assets/circle.svg";
import CrossIcon from "@/components/TacToe/assets/x.svg";
import YellowCircle from "@/components/TacToe/assets/yellow-circle.svg";
import YellowCross from "@/components/TacToe/assets/yellow-x.svg";
import BlackCircle from "@/components/TacToe/assets/black-circle.svg";
import BlackCross from "@/components/TacToe/assets/black-x.svg";

import BotX from "@/components/TacToe/assets/bot-x.svg";
import YellowBotX from "@/components/TacToe/assets/yellow-bot-x.svg";
import CircleIcon1 from "@/components/TacToe/assets/white-o1.png";
import CrossIcon1 from "@/components/TacToe/assets/white-x1.png";
import YellowCircle1 from "@/components/TacToe/assets/yellow-o1.png";
import YellowCross1 from "@/components/TacToe/assets/yellow-x1.png";
import BlackCircle1 from "@/components/TacToe/assets/black-o1.png";
import BlackCross1 from "@/components/TacToe/assets/black-x1.png";
import BlackBotX from "@/components/TacToe/assets/black-bot-x.png";

export interface Info {
    burner: string;
    address: string;
    level?: number;
    point?: number;
    img: string;
    mark: UserMarkType;
    isBot?: boolean;
}
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

export enum Game2Status {
    NotStarted, //未开始
    WaitingForPlayer2, //等待玩家2
    QuitByPlayer1, //玩家1退出匹配
    InProgress, //进行中
    WinByConnecting, //玩家1通过连线获胜
    LoseByConnecting, //玩家2通过连线获胜
    WinBySurrender, //玩家1投降
    LoseBySurrender, //玩家2投降
    WinByGridCount, //玩家1通过格子数获胜
    LoseyGridCount, //玩家2通过格子数获胜
}

export const getWinState = (gameState: GameState) => {
    return [
        GameState.WinByConnecting,
        GameState.WinByGridCount,
        GameState.WinBySurrender,
        GameState.WinByTimeout,
    ].includes(gameState);
};

export const getPvpWinState = (gameState: Game2Status) => {
    return [
        Game2Status.WinByConnecting,
        Game2Status.WinBySurrender,
        Game2Status.WinByGridCount,
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
    BlackCircle: BlackCircle,
    BlackCross: BlackCross,
    BlackBotX: BlackBotX,
};

export const UserMarkIcon1 = {
    Circle: CircleIcon1,
    Cross: CrossIcon1,
    YellowCircle: YellowCircle1,
    YellowCross: YellowCross1,
    BotX: BotX,
    YellowBotX: YellowBotX,
    BlackCircle: BlackCircle1,
    BlackCross: BlackCross1,
    BlackBotX: BlackBotX,
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
}

const winEmoji = ["❤️", "👑", "🦋", "🌻", "🥳", "🤪", "😎", "🤭", "🤩"];
const loseEmoji = ["🥀", "💔", "🥲", "🥶", "🤬", "🥺", "🤕", "☠️"];

export const RobotImg = Robot;

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
@skylabHQ on @base`;
};

export const SixtySecond = 60 * 1000;
export const ThirtySecond = 30 * 1000;
export const TwelveHours = 12 * 60 * 60; //十二小时
