import getBetLogsRepository from "./models/bet-logs";
import getBetRepository from "./models/bets";
import getRoundRepository from "./models/rounds";
import SettlementRules from "./settlementRules";
import generateResult from "./shuffleNumbers";

const choices = ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"];
const choicesMapper = { big: 1, small: 2, odd: 3, even: 4, gold: 5, wood: 6, water: 7, fire: 6, earth: 7 };
export default [
    {
        id: 16,
        name: "KenoEast",
        durations: {
            wholeRound: 39,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoEast_phien"),
            betsRepository: getBetRepository("KenoEast_one"),
            betLogsRepository: getBetLogsRepository("KenoEast_cuoc"),
        },
        generateResult: () => generateResult(20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 12,
        name: "KenoMax",
        durations: {
            wholeRound: 59,
            placingBets: 50,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoMax_phien"),
            betsRepository: getBetRepository("KenoMax_one"),
            betLogsRepository: getBetLogsRepository("KenoMax_cuoc"),
        },
        generateResult: () => generateResult(20, 80),
        settle: SettlementRules.full,
    },
];
