import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import individualController from "../controllers/individualController.js";

const individualRouter = express.Router();

individualRouter.use(checkUserAuth);

individualRouter.post("/addIndividual", individualController.addIndividual);
individualRouter.get("/getAllBroker", individualController.getAllBroker);
individualRouter.get("/getAllSeller", individualController.getAllSeller);
individualRouter.get("/getAllBuyer", individualController.getAllBuyer);
individualRouter.get("/getSingleIndividual/:id", individualController.getSingleIndividual);
individualRouter.get("/getAllBrokers", individualController.getAllBrokers);
individualRouter.get("/getAllSellers", individualController.getAllSellers);
individualRouter.get("/getAllBuyers", individualController.getAllBuyers);

export default individualRouter;