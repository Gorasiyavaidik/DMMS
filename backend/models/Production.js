import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        month : Number,
        year : Number,
        Count : Number,
    }, { timestamps: true }
);

const productionModel = mongoose.model("production", colSche);

export default productionModel;