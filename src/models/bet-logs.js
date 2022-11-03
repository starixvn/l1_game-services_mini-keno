import mongoose from "mongoose";

const schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: Date, required: true },

    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    odd: { type: Number, default: 0 },
    even: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    wood: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    earth: { type: Number, default: 0 },

    rebet: { type: Boolean, default: false },

    siteId: { type: String },
    freeBet: { type: Boolean },

    currency: { type: String, required: true },
    rate: { type: Number, required: true },

    playerId: { type: Number, required: true },
    operatorId: { type: String, required: true },
    roundId: { type: Number, required: true },

    clientSentTime: { type: Date },
    receivedTime: { type: Date },
});

export default (modelName) => {
    return mongoose.model(modelName, schema);
};
