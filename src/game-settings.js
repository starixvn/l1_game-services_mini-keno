import getBetLogsRepository from "./models/bet-logs";
import getBetRepository from "./models/bets";
import getRoundRepository from "./models/rounds";
import SettlementRules from "./settlementRules";
import generateResult from "./shuffleNumbers";

const choices = ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"];
const choicesMapper = { big: 1, small: 2, odd: 3, even: 4, gold: 5, wood: 6, water: 7, fire: 6, earth: 7 };
export const hedgeBetGroups = [
    ["big", "small"],
    ["even", "odd"],
];

export default [
    {
        id: 16,
        name: "KenoEast",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoEast_phien"),
            betsRepository: getBetRepository("KenoEast_one"),
            betLogsRepository: getBetLogsRepository("KenoEast_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
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
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoMax_phien"),
            betsRepository: getBetRepository("KenoMax_one"),
            betLogsRepository: getBetLogsRepository("KenoMax_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 13,
        name: "KenoMax2",
        durations: {
            wholeRound: 59,
            placingBets: 50,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoMax2_phien"),
            betsRepository: getBetRepository("KenoMax2_one"),
            betLogsRepository: getBetLogsRepository("KenoMax2_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 14,
        name: "KenoMini",
        durations: {
            wholeRound: 47,
            placingBets: 40,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoMini_phien"),
            betsRepository: getBetRepository("KenoMini_one"),
            betLogsRepository: getBetLogsRepository("KenoMini_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 10, 40),
        settle: SettlementRules.mini,
    },
    {
        id: 15,
        name: "KenoMini2",
        durations: {
            wholeRound: 37,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoMini2_phien"),
            betsRepository: getBetRepository("KenoMini2_one"),
            betLogsRepository: getBetLogsRepository("KenoMini2_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 10, 40),
        settle: SettlementRules.mini,
    },
    {
        id: 19,
        name: "KenoNorth",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoNorth_phien"),
            betsRepository: getBetRepository("KenoNorth_one"),
            betLogsRepository: getBetLogsRepository("KenoNorth_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 18,
        name: "KenoSouth",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoSouth_phien"),
            betsRepository: getBetRepository("KenoSouth_one"),
            betLogsRepository: getBetLogsRepository("KenoSouth_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 17,
        name: "KenoWest",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("KenoWest_phien"),
            betsRepository: getBetRepository("KenoWest_one"),
            betLogsRepository: getBetLogsRepository("KenoWest_cuoc"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 52,
        name: "MegaKeno",
        durations: {
            wholeRound: 55,
            placingBets: 45,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("MegaKeno_rounds"),
            betsRepository: getBetRepository("MegaKeno_ones"),
            betLogsRepository: getBetLogsRepository("MegaKeno_bets"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
    {
        id: 53,
        name: "MegaKeno2",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("MegaKeno2_rounds"),
            betsRepository: getBetRepository("MegaKeno2_ones"),
            betLogsRepository: getBetLogsRepository("MegaKeno2_bets"),
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
    },
];
