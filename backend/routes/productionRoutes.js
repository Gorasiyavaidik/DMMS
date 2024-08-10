import express from 'express';
import checkUserAuth from '../middlewares/userAuth.js';
import productionController from '../controllers/productionController.js';

const productionRouter = express.Router();

//Router level middlewares - to protect routes
productionRouter.use(checkUserAuth);

//Public routes


//Protected routes
productionRouter.get('/getProduction', productionController.getProduction);
productionRouter.get('/lastYearProduction', productionController.lastYearProduction);

export default productionRouter;