import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import diamondController from "../controllers/diamondController.js";


const diamondRouter =  express.Router();

//Router level middlewares - to protect routes
diamondRouter.use(checkUserAuth);

//Public routes


//Protected routes
diamondRouter.post("/addDiamond", diamondController.addDiamond);
diamondRouter.get("/getSellerDiamond/:id", diamondController.getSellerDiamond);
diamondRouter.get("/getBrokerDiamond/:id", diamondController.getBrokerDiamond);
diamondRouter.get("/getBuyerDiamond/:id", diamondController.getBuyerDiamond);
diamondRouter.get("/getAllDiamond", diamondController.getAllDiamond);
diamondRouter.post("/editDiamond", diamondController.editDiamond);
diamondRouter.get("/deleteDiamond/:serialNo", diamondController.deleteDiamond);
diamondRouter.post("/getAllRelatedDiamond", diamondController.getAllRelatedDiamond);




export default diamondRouter;