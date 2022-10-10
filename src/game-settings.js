import {
    rounds as getRoundRepository,
    betlogs as getBetLogsRepository,
    bets as getBetRepository,
    tempBets as getTempBetRepository,
    result as getResultRepository,
} from "./models";
import SettlementRules from "./settlementRules";
import generateResult from "./shuffleNumbers";
import { generateRawResultForHash } from "./result-helper";
import { allGamesHistoriesModel } from "sc-multiple-games-base";

const choices = ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"];
const choicesMapper = { big: 1, small: 2, odd: 3, even: 4, gold: 5, wood: 6, water: 7, fire: 6, earth: 7 };
export const hedgeBetGroups = [
    ["big", "small"],
    ["even", "odd"],
];

const allGamesBetsRepository = allGamesHistoriesModel("megakeno_histories");

const kenoDirectionDurations = {
    wholeRound: 43,
    placingBets: 30,
    lockingBet: 5,
};

const fullGenerateResult = (randomMode) => generateResult(randomMode, 20, 80);
const miniGenerateResult = (randomMode) => generateResult(randomMode, 10, 40);

function generateGameSetting(id, name, durations, settle, generateResult) {
    return {
        id,
        name,
        durations,
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        settle,
        generateResult,
        generateRawResultForHash,
    };
}

export default [
    {
        ...generateGameSetting(16, "KenoEast", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            roundsRepository: getRoundRepository("KenoEast_phien"),
            betsRepository: getBetRepository("KenoEast_one"),
            betLogsRepository: getBetLogsRepository("KenoEast_cuoc"),
            resultsRepository: getResultRepository("KenoEast_result"),
            tempBetsRepository: getTempBetRepository("KenoEast_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(
            14,
            "KenoMini",
            {
                wholeRound: 51,
                placingBets: 40,
                lockingBet: 5,
            },
            SettlementRules.mini,
            miniGenerateResult
        ),
        repositories: {
            roundsRepository: getRoundRepository("KenoMini_phien"),
            betsRepository: getBetRepository("KenoMini_one"),
            betLogsRepository: getBetLogsRepository("KenoMini_cuoc"),
            resultsRepository: getResultRepository("KenoMini_result"),
            tempBetsRepository: getTempBetRepository("KenoMini_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(
            15,
            "KenoMini2",
            {
                wholeRound: 41,
                placingBets: 30,
                lockingBet: 5,
            },
            SettlementRules.mini,
            miniGenerateResult
        ),
        repositories: {
            roundsRepository: getRoundRepository("KenoMini2_phien"),
            betsRepository: getBetRepository("KenoMini2_one"),
            betLogsRepository: getBetLogsRepository("KenoMini2_cuoc"),
            resultsRepository: getResultRepository("KenoMini2_result"),
            tempBetsRepository: getTempBetRepository("KenoMini2_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(19, "KenoNorth", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            roundsRepository: getRoundRepository("KenoNorth_phien"),
            betsRepository: getBetRepository("KenoNorth_one"),
            betLogsRepository: getBetLogsRepository("KenoNorth_cuoc"),
            resultsRepository: getResultRepository("KenoNorth_result"),
            tempBetsRepository: getTempBetRepository("KenoNorth_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(18, "KenoSouth", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            roundsRepository: getRoundRepository("KenoSouth_phien"),
            betsRepository: getBetRepository("KenoSouth_one"),
            betLogsRepository: getBetLogsRepository("KenoSouth_cuoc"),
            resultsRepository: getResultRepository("KenoSouth_result"),
            tempBetsRepository: getTempBetRepository("KenoSouth_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(17, "KenoWest", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            allGamesBetsRepository,
            roundsRepository: getRoundRepository("KenoWest_phien"),
            betsRepository: getBetRepository("KenoWest_one"),
            betLogsRepository: getBetLogsRepository("KenoWest_cuoc"),
            resultsRepository: getResultRepository("KenoWest_result"),
            tempBetsRepository: getTempBetRepository("KenoWest_tmpbets"),
        },
    },
    {
        ...generateGameSetting(
            52,
            "MegaKeno",
            {
                wholeRound: 58,
                placingBets: 45,
                lockingBet: 5,
            },
            SettlementRules.full,
            fullGenerateResult
        ),
        repositories: {
            roundsRepository: getRoundRepository("MegaKeno_rounds"),
            betsRepository: getBetRepository("MegaKeno_ones"),
            betLogsRepository: getBetLogsRepository("MegaKeno_bets"),
            resultsRepository: getResultRepository("MegaKeno_result"),
            tempBetsRepository: getTempBetRepository("MegaKeno_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(
            53,
            "MegaKeno2",
            {
                wholeRound: 43,
                placingBets: 30,
                lockingBet: 5,
            },
            SettlementRules.full,
            fullGenerateResult
        ),
        repositories: {
            allGamesBetsRepository,
            roundsRepository: getRoundRepository("MegaKeno2_rounds"),
            betsRepository: getBetRepository("MegaKeno2_ones"),
            betLogsRepository: getBetLogsRepository("MegaKeno2_bets"),
            resultsRepository: getResultRepository("MegaKeno2_result"),
            tempBetsRepository: getTempBetRepository("MegaKeno2_tmpbets"),
        },
    },
];
