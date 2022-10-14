import gameSettings from "../../../src/game-settings";

const megaKenoGameSetting = gameSettings.find((setting) => setting.name === "MegaKeno");

export default [
    {
        ...megaKenoGameSetting,
        durations: {
            wholeRound: 21,
            placingBets: 15,
            lockingBet: 2,
        },
    },
];
