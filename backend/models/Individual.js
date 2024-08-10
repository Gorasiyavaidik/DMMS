import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        name: String,
        number: Number,
        type: String,
        balance: Number,
        address: String,
        note: String
    }, { timestamps: true }
);

const individualModel = mongoose.model("individual", colSche);

export default individualModel;