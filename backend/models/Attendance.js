import mongoose from "mongoose";

const colSche = new mongoose.Schema(
    {
        month: Number,
        year: Number,
        staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
        attendance: { type: Map, default: {} }
    }, { timestamps: true }
);

const attendanceModel = mongoose.model("attendance", colSche);

export default attendanceModel;