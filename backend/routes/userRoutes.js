import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import userController from "../controllers/userController.js";

const userRouter =  express.Router();

//Router level middlewares - to protect routes
userRouter.use("/changeUserPassword", checkUserAuth);
userRouter.use("/loggedUser", checkUserAuth);

//Public routes
userRouter.post("/userRegisteration", userController.userRegistration);
userRouter.post("/userLogin", userController.userLogin);
userRouter.post("/userPasswordResetEmail", userController.userPasswordResetEmail);
userRouter.post("/userPasswordReset/:token", userController.userPasswordReset);

//Protected routes
userRouter.post("/changeUserPassword", userController.changeUserPassword);
userRouter.get("/loggedUser", userController.loggedUser);

export default userRouter;