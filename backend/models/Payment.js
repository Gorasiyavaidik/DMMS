import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        inventory: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "diamond" },
            serialNo: String
        },
        cut: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "cut" },
            serialNo: String
        },
        broker: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "individual" },
            name: String
        },
        seller: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "selller" },
            name: String
        },
        buyer: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "buyer" },
            name: String
        },
        workshop: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "buyer" },
            name: String
        },
        type: String,
        amount: Number,
        date: Date,
        state: String,
        note: String
    }, { timestamps: true }
);

const paymentModel = mongoose.model("payment", colSche);

export default paymentModel;