import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        message: { type: String, required: true },
        date : { type: Date },
    }, { timestamps: true }
);

const notificationModel = mongoose.model("notification", colSche);

export default notificationModel;