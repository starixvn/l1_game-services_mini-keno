import mongoose from "mongoose";
import { users } from "sc-base-database";
import { middlewares } from "sc-common";
import {
    createCurrencyGroupGames,
    createDummyCurrency,
    createDummyUsers,
    createExchangeRate,
    createGameConfig,
    createPartnerConfig,
    normalUser,
} from "sc-game-service-integration-utils";

import appConfigs from "../../../src/app-configs.IGT";
import { rounds as miniKenoRounds, bets } from "../../../src/models";
import { currencyData, game, gameConfig, rounds, userBetData } from "./test-data";

const connectDatabase = async () => {
    console.log("connect database");
    await middlewares.database.configureDatabase(mongoose, appConfigs.database);

    await clearAllData();
};

const clearAllData = async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }
};

const createViews = async () => {
    await mongoose.connection.db.createCollection("megakeno_histories", {
        viewOn: "users",
        pipeline: [
            {
                $project: {
                    _id: 0,
                    playerId: "$local.memberId",
                    operatorId: {
                        $ifNull: [
                            {
                                $ifNull: ["$local.operatorId", "$local.partnerId"],
                            },
                            "$local.clientId",
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall1_bets",
                    let: {
                        playerId: "$playerId",
                        operatorId: "$operatorId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                        {
                                            $eq: ["$operatorId", "$$operatorId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall1_betlogs",
                                let: {
                                    roundId: "$roundId",
                                    playerId: "$playerId",
                                    operatorId: "$operatorId",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: ["$roundId", "$$roundId"],
                                                    },
                                                    {
                                                        $eq: ["$playerId", "$$playerId"],
                                                    },
                                                    {
                                                        $eq: ["$operatorId", "$$operatorId"],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall1_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 50,
                                },
                            },
                        },
                    ],
                    as: "lasvegas",
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall2_bets",
                    let: {
                        playerId: "$playerId",
                        operatorId: "$operatorId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                        {
                                            $eq: ["$operatorId", "$$operatorId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall2_betlogs",
                                let: {
                                    roundId: "$roundId",
                                    playerId: "$playerId",
                                    operatorId: "$operatorId",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: ["$roundId", "$$roundId"],
                                                    },
                                                    {
                                                        $eq: ["$playerId", "$$playerId"],
                                                    },
                                                    {
                                                        $eq: ["$operatorId", "$$operatorId"],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall2_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 51,
                                },
                            },
                        },
                    ],
                    as: "marinabay",
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall3_bets",
                    let: {
                        playerId: "$playerId",
                        operatorId: "$operatorId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                        {
                                            $eq: ["$operatorId", "$$operatorId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall3_betlogs",
                                let: {
                                    roundId: "$roundId",
                                    playerId: "$playerId",
                                    operatorId: "$operatorId",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: ["$roundId", "$$roundId"],
                                                    },
                                                    {
                                                        $eq: ["$playerId", "$$playerId"],
                                                    },
                                                    {
                                                        $eq: ["$operatorId", "$$operatorId"],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall3_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 54,
                                },
                            },
                        },
                    ],
                    as: "macau",
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall4_bets",
                    let: {
                        playerId: "$playerId",
                        operatorId: "$operatorId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                        {
                                            $eq: ["$operatorId", "$$operatorId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall4_betlogs",
                                let: {
                                    roundId: "$roundId",
                                    playerId: "$playerId",
                                    operatorId: "$operatorId",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: ["$roundId", "$$roundId"],
                                                    },
                                                    {
                                                        $eq: ["$playerId", "$$playerId"],
                                                    },
                                                    {
                                                        $eq: ["$operatorId", "$$operatorId"],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall4_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 55,
                                },
                            },
                        },
                    ],
                    as: "montecarlo",
                },
            },
            {
                $set: {
                    lasvegas: "$$REMOVE",
                    marinabay: "$$REMOVE",
                    macau: "$$REMOVE",
                    montecarlo: "$$REMOVE",
                    bet: {
                        $concatArrays: ["$lasvegas", "$marinabay", "$macau", "$montecarlo"],
                    },
                },
            },
            {
                $unwind: "$bet",
            },
        ],
    });
};

export const createTestData = async () => {
    await connectDatabase();
    await createExchangeRate();
    await createGameConfig(gameConfig);
    const partnerConfig = await createPartnerConfig(game.id);

    const currency = await createDummyCurrency(partnerConfig.partnerId, currencyData.code, currencyData.name);
    await createCurrencyGroupGames(currency.groupId, game.id, gameConfig);
    await createDummyUsers(currency);
    await createRounds();
    await createUserBetData();
    await createViews();

    console.log("Create exchange rate, game config & dummy user for testing successfully!");
    process.exit(0);
};

const getUserId = async (memberId) => {
    const user = await users.findOne({ "local.memberId": memberId }, { _id: true }).lean();
    return user._id.toString();
};

const createRounds = async () => {
    try {
        await miniKenoRounds("megakeno_rounds").insertMany(rounds);
        await miniKenoRounds("megakeno2_rounds").insertMany(rounds);
        await miniKenoRounds("kenoeast_phien").insertMany(rounds);
        await miniKenoRounds("kenowest_phien").insertMany(rounds);
    } catch (error) {
        console.log(error);
    }
};

const createUserBetData = async () => {
    const userId = await getUserId(normalUser.playerId);
    const betData = userBetData(userId);
    await bets("megakeno_ones").insertMany(betData);
    await bets("megakeno2_ones").insertMany(betData);
    await bets("kenoeast_ones").insertMany(betData);
    await bets("kenowest_ones").insertMany(betData);
};

createTestData();
