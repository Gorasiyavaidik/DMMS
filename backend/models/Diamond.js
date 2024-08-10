import mongoose from "mongoose";


const colSche = new mongoose.Schema(
    {
        serialNo: { type: String, required: true, trim: true, unique: true },
        weight: { type: Number, required: true },
        broker: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "individual" },
            name: String
        },
        seller: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "individual" },
            name: String
        },
        grade: { type: String, required: true },
        colour: { type: String, required: true },
        price: { type: Number, required: true },
        payment_date: { type: Date, required: true },
        discount: { type: Number, required: true },
        total_price: { type: Number, required: true },
        note: { type: String },
        child: { type: Object }
    }, { timestamps: true }
);

const diamondModel = mongoose.model("diamond", colSche);

export default diamondModel;