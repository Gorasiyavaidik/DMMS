import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import notificationController from "../controllers/notificationController.js";

const notificationRouter =  express.Router();

notificationRouter.use(checkUserAuth);

notificationRouter.get("/notification", notificationController.notificationalert);

export default notificationRouter;