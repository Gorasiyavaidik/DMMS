import mongoose from "mongoose";
import paymentModel from "../models/Payment.js";
import cutModel from "../models/Cut.js";

class paymentConteroller {
  static receivable = async (req, res) => {
    try {
      const payment = await paymentModel.find({ type: "credit" });
      return res.success(200, "Payment found.", payment);
    } catch (error) {
      // console.log(error.message);
      return res.error(400, error, null);
    }
  };

  static payable = async (req, res) => {
    try {
      const payment = await paymentModel.find({ type: "Debit" });
      return res.success(200, "Payment found.", payment);
    } catch (error) {
      // console.log(error.message);
      return res.error(400, error, null);
    }
  };

  static profitLastSixMonth = async (req, res) => {
    try {
      let count = 0;
      let profit = [{}];
      const date = new Date();
      const month = date.getMonth() + 1;
      // console.log(month);
      const year = date.getFullYear();
      const lastyearmonth = 6 - month + 1;

      if (lastyearmonth > 0) {
        const startmonth = 12 - lastyearmonth;
        for (let i = startmonth + 1; i <= 12; i++) {
          count++;
          if (count > 6) {
            break;
          }
          let monthprofit = 0;
          const startDate = new Date(
            Date.UTC(new Date().getFullYear() - 1, i - 1, 1)
          );
          const endDate = new Date(
            Date.UTC(new Date().getFullYear() - 1, i, 0)
          );

          const cut = await cutModel.find({state:"Sold",
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          });
          for (const item of cut) {
            monthprofit += item.expenses[0].amount - item.expenses[1].amount;
          }
          profit.push({  month: i, year: year - 1, profit: monthprofit });
        }
      }
      for (let i = 1; i <= month; i++) {
        count++;
        if (count > 6) {
          break;
        }
        const startDate = new Date(
          Date.UTC(new Date().getFullYear(), i - 1, 1)
        );
        const endDate = new Date(Date.UTC(new Date().getFullYear(), i, 0));
        const cut = await cutModel.find({ state : "Sold" , createdAt: { $gte: startDate, $lte: endDate }});
        
        let monthprofit = 0;
        for (const item of cut) {
          monthprofit += item.expenses[0].amount - item.expenses[1].amount;
        }
        profit.push({ month: i, year: year, profit: monthprofit });
      }
      if (profit < 0) {
        profit = 0;
      }
      if (profit) {
        return res.success(200, "Profit found.", profit);
      } else {
        return res.error(404, "Profit not found.", null);
      }
    } catch (error) {
      // console.log(error.message);
      return res.error(400, error, null);
    }
  };


  static Revenue = async (req, res) => {
    try {
        let count = 0;
        let profit = [{}];
        const date = new Date();
        const month = date.getMonth() + 1;
        // console.log(month);
        const year = date.getFullYear();
        const lastyearmonth = 6 - month + 1;
  
        if (lastyearmonth > 0) {
          const startmonth = 12 - lastyearmonth;
          for (let i = startmonth + 1; i <= 12; i++) {
            count++;
            if (count > 6) {
              break;
            }
            let revenue = 0;
            const startDate = new Date(
              Date.UTC(new Date().getFullYear() - 1, i - 1, 1)
            );
            // console.log(new Date().getFullYear() - 1, i - 1, 1)
            const endDate = new Date(
              Date.UTC(new Date().getFullYear() - 1, i, 0)
            );
            // console.log(new Date().getFullYear() - 1, i, 0)
            const cut = await cutModel.find({state:"Sold",
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            });
            for (const item of cut) {
              revenue += item.expenses[0].amount ;
            }
            // console.log(cut)
            profit.push({  month: i, year: year - 1, revenue: revenue });
          }
        }
        for (let i = 1; i <= month; i++) {
          count++;
          if (count > 6) {
            break;
          }
          const startDate = new Date(
            Date.UTC(new Date().getFullYear(), i - 1, 1)
          );
          const endDate = new Date(Date.UTC(new Date().getFullYear(), i, 0));
          const cut = await cutModel.find({ state : "Sold" , createdAt: { $gte: startDate, $lte: endDate }});
          let revenue = 0;
          for (const item of cut) {
            revenue += item.expenses[0].amount;
          }
          profit.push({ month: i, year: year, revenue: revenue });
        }
        // console.log(profit)
        
        if (profit) {
          return res.success(200, "Profit found.", profit);
        } else {
          return res.error(404, "Profit not found.", null);
        }
      } catch (error) {
        // console.log(error.message);
        return res.error(400, error, null);
      }
    }


    static financialYearProfit = async (req,res) =>{
        try {
            const year = parseInt(req.params.year);
            const startDate = new Date(Date.UTC(year, 3, 1)); // Financial year starts from April (4th month)
            const endDate = new Date(Date.UTC(year + 1, 2, 31)); // Financial year ends in March (3rd month)
            const cut = await cutModel.find({state:"Sold",
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            });
            let profit = 0;
            for (const item of cut) {
              profit += item.expenses[0].amount - item.expenses[1].amount;
            }
            const cut2 = await cutModel.find({state:"Weightloss",
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            });
            for(const item of cut2){
               if(item.expenses[0].amount !== undefined)
                {
                  profit -= item.expenses[0].amount*item.weight;
                }
            }
            const data ={
              cut,
              cut2,
              profit
            }
            if (profit) {
              return res.success(200, "Profit found.", data);
            } else {
              return res.error(404, "Profit not found.", null);
            }
          } catch (error) {
            // console.log(error)
            return res.error(400, error, null);
          }
    }
}

export default paymentConteroller;
