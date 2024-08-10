import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, trim: true },
        mobile: { type: Number, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        tc: { type: Boolean, required: true }
    }, { timestamps: true }
);

const userModel = mongoose.model("user", colSche);

export default userModel;