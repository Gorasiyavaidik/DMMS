import mongoose from "mongoose";
import notificationModel from "../models/Notification.js";

class notificationController {
    static notificationalert = async (req, res) => {
        try {
            const notification = await notificationModel.find({});

            const date = new Date();
            const notifications = await notificationModel.find({ date: { $gte: date } })
                                            .sort({ date: 1 })
                                            .exec()
            return res.success(200, "Notification found.", notifications);
        } catch (error) {
            // console.log(error.message);
            return res.error(400, error, null);
        }
    };
}

export default notificationController;
