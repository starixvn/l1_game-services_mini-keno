import mongoose from "mongoose";

const schema = new mongoose.Schema({
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

    currency: { type: String, require: true },
    rate: { type: Number, require: true },

    playerId: { type: Number },
    operatorId: { type: String, require: true },
    roundId: { type: Number, required: true },
    paid: { type: Boolean, default: false },
});

export default (modelName) => {
    return mongoose.model(modelName, schema);
};
