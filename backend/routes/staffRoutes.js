import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import staffController from "../controllers/staffController.js";


const staffRouter =  express.Router();

staffRouter.use(checkUserAuth);

staffRouter.post("/addStaff", staffController.addStaff);
staffRouter.get("/getAllStaff", staffController.getAllStaff);
staffRouter.get("/getIndividualStaff/:id", staffController.getIndividualStaff);



export default staffRouter;