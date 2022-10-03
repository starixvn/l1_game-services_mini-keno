import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    odd: { type: Number, default: 0 },
    even: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    wood: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    earth: { type: Number, default: 0 },

    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    siteId: { type: String },
    freeBet: { type: Boolean },

    playerId: { type: Number },
    roundId: { type: Number, required: true },
    paid: { type: Boolean, default: false },
};

export function bets(modelName) {
    return mongoose.model(
        modelName,
        new mongoose.Schema({
            ...bet,
            currency: { type: String, required: true },
            rate: { type: Number, required: true },
            operatorId: { type: String, required: false },
        })
    );
}

export function tempBets(modelName) {
    return mongoose.model(modelName, new mongoose.Schema(bet));
}
