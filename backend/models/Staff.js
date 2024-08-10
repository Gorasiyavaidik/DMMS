import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        name: { type: String },
        salary: { type: Number },
        number: { type: Number },
        address: { type: String },
        balance: { type: Number },
        note: { type: String }
    }, { timestamps: true }
);

const staffModel = mongoose.model("staff", colSche);

export default staffModel;