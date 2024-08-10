import mongoose from "mongoose";
import productionModel from "../models/Production.js";

class productionController {
  static getProduction = async (req, res) => {
    try {
      const date = new Date();
      const Month = date.getMonth() + 1;
      const Year = date.getFullYear();
      const production = await productionModel.findOne({
        month: Month,
        year: Year,
      });
      return res.success(200, "Production found.", production);
    } catch (error) {
      return res.error(400, error, null);
    }
  };
  static lastYearProduction = async (req, res) => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const productionarray = [];
      for(let i = month ; i <= 12 ; i++){
        const production = await productionModel.findOne({
            month: i,
            year: today.getFullYear() - 1,
          });
          if(production){
              productionarray.push(production)
          } 
    }
    for(let i = 0; i < month; i++){
        const production = await productionModel.findOne({
            month: i,
            year: today.getFullYear(),
          });
          if(production){
              productionarray.push(production)
          }
    }
      return res.success(200, "Production found.", productionarray);
    } catch (error) {
      return res.error(400, error, null);
    }
  };
}
export default productionController;
