import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import paymentController from "../controllers/paymentController.js";

const paymentRouter =  express.Router();

//Router level middlewares - to protect routes
paymentRouter.use(checkUserAuth);

//Public routes


//Protected routes
paymentRouter.get('/receivable',paymentController.receivable);
paymentRouter.get('/payable',paymentController.payable);
paymentRouter.get('/profitLastSixMonth',paymentController.profitLastSixMonth);
paymentRouter.get('/Revenue',paymentController.Revenue);
paymentRouter.get('/financialYearProfit/:year',paymentController.financialYearProfit);

export default paymentRouter;