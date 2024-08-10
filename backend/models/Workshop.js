import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        owner: {
            Name: { type: String, required: true },
            number: { type: String, required: true }
        },
        address: { type: String, required: true },
        note: { type: String },
        balance: { type: Number },
        LabourPerDiamond: { type: Number },
        diamonds: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: "diamonds" },
            serialNo: String
        }]
    }, { timestamps: true }
);

const workshopModel = mongoose.model("workshop", colSche);

export default workshopModel;