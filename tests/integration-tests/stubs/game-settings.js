import {
    rounds as getRoundRepository,
    betlogs as getBetLogsRepository,
    bets as getBetRepository,
    tempBets as getTempBetRepository,
    result as getResultRepository,
} from "../../../src/models";
import SettlementRules from "../../../src/settlementRules";
import generateResult from "../../../src/shuffleNumbers";
import { generateRawResultForHash } from "../../../src/result-helper";
import { allGamesHistoriesModel } from "sc-multiple-games-base";

const choices = ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"];
const choicesMapper = { big: 1, small: 2, odd: 3, even: 4, gold: 5, wood: 6, water: 7, fire: 6, earth: 7 };
const hedgeBetGroups = [
    ["big", "small"],
    ["even", "odd"],
];

const allGamesBetsRepository = allGamesHistoriesModel("megakeno_histories");

export default [
    {
        id: 52,
        name: "MegaKeno",
        durations: {
            wholeRound: 21,
            placingBets: 15,
            lockingBet: 2,
        },
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        repositories: {
            roundsRepository: getRoundRepository("MegaKeno_rounds"),
            betsRepository: getBetRepository("MegaKeno_ones"),
            betLogsRepository: getBetLogsRepository("MegaKeno_bets"),
            resultsRepository: getResultRepository("MegaKeno_result"),
            tempBetsRepository: getTempBetRepository("MegaKeno_tmpcuoc"),
            allGamesBetsRepository,
        },
        generateResult: (randomMode) => generateResult(randomMode, 20, 80),
        settle: SettlementRules.full,
        generateRawResultForHash,
    },
];
