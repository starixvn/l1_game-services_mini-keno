import mongoose from "mongoose";

const schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: Date, required: true },

    choice: { type: String, required: true },
    amount: { type: Number, required: true },

    siteId: { type: String },
    freeBet: { type: Boolean },

    currency: { type: String, required: true },
    rate: { type: Number, required: true },

    playerId: { type: Number, required: true },
    operatorId: { type: String, required: true },
    roundId: { type: Number, requiredd: true },
});

export default (modelName) => {
    return mongoose.model(modelName, schema);
};
