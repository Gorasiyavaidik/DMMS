import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import cutController from "../controllers/cutController.js";

const cutRouter = express.Router();

// cutRouter.use(checkUserAuth);

cutRouter.post("/addCut", cutController.addCut);
cutRouter.get("/getRoughInventory", cutController.getRoughInventory);
cutRouter.post("/roughToSorting", cutController.roughToSorting);
cutRouter.get("/getSortingInventory", cutController.getSortingInventory);
cutRouter.post("/SortingToReadyToPolish", cutController.SortingToReadyToPolish);
cutRouter.post("/SortingToRoughToSell", cutController.SortingToRoughToSell);
cutRouter.post("/SortingToRoughToWeightloss", cutController.SortingToRoughToWeightloss);
cutRouter.get("/getReadyToPolish", cutController.getReadyToPolishInventory);
cutRouter.post("/ReadyToPolishToPolishing", cutController.ReadyToPolishToPolishing);
cutRouter.get("/getPolishingInventory", cutController.getPolishingInventory);
cutRouter.post("/PolishingToPolished", cutController.PolishingToPolished);
cutRouter.get("/getPolishedInventory", cutController.getPolishedInventory);
cutRouter.post("/sold", cutController.sold);
cutRouter.get("/getRoughToSell", cutController.getRoughToSellInventory);
cutRouter.get("/getInventory/:serialNo", cutController.getInventory);
cutRouter.get("/deleteInventory", cutController.deleteInventory);
cutRouter.get("/getWorkshopInventory/:id", cutController.getWorkshopInventory);
cutRouter.get("/profitCurrentMonth", cutController.profitCurrentMonth);
cutRouter.get("/totalPolished", cutController.totalPolished);


export default cutRouter;