import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import attendanceController from "../controllers/attendanceController.js";


const attedanceRouter =  express.Router();

//Router level middlewares - to protect routes


//Public routes
attedanceRouter.post("/addAttendance",  attendanceController.addAttendance);
attedanceRouter.get("/getStaffAttendance/:id", attendanceController.getStaffAttendance);

//Protected routes


export default attedanceRouter;