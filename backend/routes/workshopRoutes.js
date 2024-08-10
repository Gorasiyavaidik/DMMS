import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import workshopController from "../controllers/workshopController.js";


const workshopRouter =  express.Router();

workshopRouter.use(checkUserAuth);

workshopRouter.post("/addWorkshop", workshopController.addWorkshop);
workshopRouter.get("/getAllWorkshop", workshopController.getAllWorkshop);
workshopRouter.get("/getIndividualWorkshop/:id", workshopController.getIndividualWorkshop);
workshopRouter.get("/clearBalance/:id", workshopController.clearBalance);



export default workshopRouter;