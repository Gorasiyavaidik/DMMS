import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        serialNo: { type: String, required: true, trim: true, unique: true },
        weight: { type: Number, required: true },
        diamondCount: { type: Number },
        workshop: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "workshop" },
            name: String
        },
        buyer: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "individual" },
            name: String
        },
        broker: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "individual" },
            name: String
        },
        state: { type: String, required: true },
        note: { type: String },
        parent: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "cut" },
            serialNo: String
        },
        owner: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "diamond" },
            serialNo: String
        },
        childs: [],
        expenses: [{
            type: { type: String },
            amount: { type: Number }, 
        }]
    }, { timestamps: true }
);

const cutModel = mongoose.model("cut", colSche);

export default cutModel;