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
                },
            },
            {
                $lookup: {
                    from: "megakeno_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "megakeno_bets",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 52 } } },
                    ],
                    as: "megakeno",
                },
            },
            {
                $lookup: {
                    from: "megakeno2_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "megakeno2_bets",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 53 } } },
                    ],
                    as: "megakeno2",
                },
            },
            {
                $lookup: {
                    from: "kenomini_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "kenomini_cuocs",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 14 } } },
                    ],
                    as: "kenomini",
                },
            },
            {
                $lookup: {
                    from: "kenomini2_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "kenomini2_cuocs",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 15 } } },
                    ],
                    as: "kenomini2",
                },
            },
            {
                $lookup: {
                    from: "kenoeast_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "kenoeast_cuocs",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 16 } } },
                    ],
                    as: "kenoeast",
                },
            },
            {
                $lookup: {
                    from: "kenowest_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "kenowest_cuocs",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 17 } } },
                    ],
                    as: "kenowest",
                },
            },
            {
                $lookup: {
                    from: "kenosouth_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "kenosouth_cuocs",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 18 } } },
                    ],
                    as: "kenosouth",
                },
            },
            {
                $lookup: {
                    from: "kenonorth_ones",
                    let: { playerId: "$playerId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$playerId", "$$playerId"] } } },
                        {
                            $lookup: {
                                from: "kenonorth_cuocs",
                                let: { roundId: "$roundId", playerId: "$playerId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ["$roundId", "$$roundId"] }, { $eq: ["$playerId", "$$playerId"] }] },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        { $set: { gameId: { $literal: 19 } } },
                    ],
                    as: "kenonorth",
                },
            },
            {
                $set: {
                    megakeno: "$$REMOVE",
                    megakeno2: "$$REMOVE",
                    kenomini: "$$REMOVE",
                    kenomini2: "$$REMOVE",
                    kenoeast: "$$REMOVE",
                    kenowest: "$$REMOVE",
                    kenosouth: "$$REMOVE",
                    kenonorth: "$$REMOVE",
                    bet: {
                        $concatArrays: [
                            "$megakeno",
                            "$megakeno2",
                            "$kenomini",
                            "$kenomini2",
                            "$kenoeast",
                            "$kenowest",
                            "$kenosouth",
                            "$kenonorth",
                        ],
                    },
                },
            },
            { $unwind: "$bet" },
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
