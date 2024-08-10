import mongoose from "mongoose";
import cutModel from "../models/Cut.js";
import diamondModel from "../models/Diamond.js";
import workshopModel from "../models/Workshop.js";
import paymentModel from "../models/Payment.js";
import ProductionModel from "../models/Production.js";
import notificationModel from "../models/Notification.js";
import { all } from "axios";
class cutController {
  static addCut = async (req, res) => {
    const session = mongoose.startSession();
    const { id } = req.params;
    const {} = req.body;
    try {
      await session.startTransaction();
      if (0) {
        await session.commitTransaction();
        return res.success(201, "Diamond updated successfully.", diamond);
      } else {
        return res.error(400, "Fill all the details please...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };

  static roughToSorting = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, weight } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      session.startTransaction();
      const expensearray = [];
        roughCuts[0].expenses.forEach((element) => {
          expensearray.push(element);
        });
      if (weight) {
        const initialCut = new cutModel({
          serialNo: serialNo + "-" + (roughCuts[0].childs.length + 1),
          weight: weight,
          state: "Sorting",
          note: "Initial Cut",
          owner: {
            id: roughCuts[0].owner.id,
            serialNo: roughCuts[0].owner.serialNo,
          },
          expenses: expensearray,
          childs: [],
        });
        const cut = await initialCut.save();
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $set: {
              weight: roughCuts[0].weight - weight,
            },
          });
        }
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $push: { childs: cut },
          });
        }
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };
  static SortingToReadyToPolish = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, weight } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      session.startTransaction();
      if (weight) {
        const expensearray = [];
        roughCuts[0].expenses.forEach((element) => {
          expensearray.push(element);
        });
        let count = 0;
        for (const inputString of roughCuts[0].childs) {
          if (typeof inputString.serialNo === "string") {
            var lastIndex = inputString.serialNo.lastIndexOf("-");
            var cutchildtype = inputString.serialNo.substring(lastIndex + 1);
            if (cutchildtype[0] == "P") count = count + 1;
          }
        }
        const initialCut = new cutModel({
          serialNo: serialNo + "-P" + (count + 1),
          weight: weight,
          state: "ReadyToPolish",
          note: "",
          owner: {
            id: roughCuts[0].owner.id,
            serialNo: roughCuts[0].owner.serialNo,
          },
          expenses: expensearray,
          childs: [],
        });
        const cut = await initialCut.save();
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $set: {
              weight: roughCuts[0].weight - weight,
            },
          });
        }
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $push: { childs: cut },
          });
        }
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };
  static SortingToRoughToSell = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, weight } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      session.startTransaction();
      if (weight) {
        const expensearray = [];
        roughCuts[0].expenses.forEach((element) => {
          expensearray.push(element);
        });
        const roughcharges = (roughCuts[0].expenses[0].amount)*weight ;
        expensearray.push({ type: "Rough Price", amount: roughcharges });
        let count = 0;
        for (const inputString of roughCuts[0].childs) {
          if (typeof inputString.serialNo === "string") {
            var lastIndex = inputString.serialNo.lastIndexOf("-");
            var cutchildtype = inputString.serialNo.substring(lastIndex + 1);
            if (cutchildtype[0] == "R") count++;
          }
        }
        const initialCut = new cutModel({
          serialNo: serialNo + "-R" + (count + 1),
          weight: weight,
          state: "RoughToSell",
          note: "",
          owner: {
            id: roughCuts[0].owner.id,
            serialNo: roughCuts[0].owner.serialNo,
          },
          expenses: expensearray,
          childs: [],
        });
        const cut = await initialCut.save();
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $set: {
              weight: roughCuts[0].weight - weight,
            },
          });
        }
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $push: { childs: cut },
          });
        }
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };
  static SortingToRoughToWeightloss = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, weight } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      let count = 0;
        const expensearray = [];
        roughCuts[0].expenses.forEach((element) => {
          expensearray.push(element);
        });
        
      for (const inputString of roughCuts[0].childs) {
        if (typeof inputString.serialNo === "string") {
          var lastIndex = inputString.serialNo.lastIndexOf("-");
          var cutchildtype = inputString.serialNo.substring(lastIndex + 1);
          if (cutchildtype[0] == "W") count++;
        }
      }
      session.startTransaction();
      if (weight) {
        const initialCut = new cutModel({
          serialNo: serialNo + "-W" + (count + 1),
          weight: weight,
          state: "Weightloss",
          note: "",
          owner: {
            id: roughCuts[0].owner.id,
            serialNo: roughCuts[0].owner.serialNo,
          },
          expenses: expensearray,
          childs: [],
        });
        const cut = await initialCut.save();
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $set: {
              weight: roughCuts[0].weight - weight,
            },
          });
        }
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $push: { childs: cut },
          });
        }
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };

  static getRoughInventory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const data = [];
      const roughCuts = await cutModel.find({ state: "Rough" });

      for (const cut of roughCuts) {
        if (cut.weight > 0) {
          const Owner = await diamondModel.findById(cut.owner.id);
          data.push({
            serialNo: cut.serialNo,
            weight: cut.weight,
            grade: Owner.grade,
            colour: Owner.colour,
            status: cut.state,
            childs: cut.childs,
          });
        }
      }
      await session.commitTransaction();
      return res.success(201, "Rough inventory fetched successfully.", data);
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };

  static getSortingInventory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const data = [];
      const roughCuts = await cutModel.find({ state: "Sorting" });

      for (const cut of roughCuts) {
        if (cut.weight > 0) {
          const Owner = await diamondModel.findById(cut.owner.id);
          data.push({
            serialNo: cut.serialNo,
            weight: cut.weight,
            grade: Owner.grade,
            colour: Owner.colour,
            status: cut.state,
          });
        }
      }
      await session.commitTransaction();
      return res.success(201, "Sorting inventory fetched successfully.", data);
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
  static getReadyToPolishInventory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const data = [];
      const roughCuts = await cutModel.find({ state: "ReadyToPolish" });

      for (const cut of roughCuts) {
        if (cut.weight > 0) {
          const Owner = await diamondModel.findById(cut.owner.id);
          data.push({
            serialNo: cut.serialNo,
            weight: cut.weight,
            grade: Owner.grade,
            colour: Owner.colour,
            status: cut.state,
          });
        }
      }
      await session.commitTransaction();
      return res.success(
        201,
        "ReadyToPolish inventory fetched successfully.",
        data
      );
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
  static ReadyToPolishToPolishing = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, weight, workshop, noofDiamond } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      session.startTransaction();
      if (weight) {
        const expensearray = [];
        const roughcharges = (roughCuts[0].expenses[0].amount)*weight ;
        expensearray.push({ type: "Rough Price", amount: roughcharges });
        const initialCut = new cutModel({
          serialNo: serialNo + "-" + (roughCuts[0].childs.length + 1),
          weight: weight,
          state: "Polishing",
          workshop: workshop,
          diamondCount: noofDiamond,
          note: "",
          owner: {
            id: roughCuts[0].owner.id,
            serialNo: roughCuts[0].owner.serialNo,
          },
          expenses: expensearray,
          childs: [],
        });
        const cut = await initialCut.save();
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $set: {
              weight: roughCuts[0].weight - weight,
            },
          });
        }
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $push: { childs: cut },
          });
        }
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };
  static getPolishingInventory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const data = [];
      const roughCuts = await cutModel.find({ state: "Polishing" });

      for (const cut of roughCuts) {
        if (cut.childs.length == 0) {
          const Owner = await diamondModel.findById(cut.owner.id);
          data.push({
            serialNo: cut.serialNo,
            weight: cut.weight,
            grade: Owner.grade,
            colour: Owner.colour,
            status: cut.state,
          });
        }
      }
      await session.commitTransaction();
      return res.success(
        201,
        "Polishing inventory fetched successfully.",
        data
      );
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
  static PolishingToPolished = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, weight, workshop, noofDiamond } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      session.startTransaction();
      if (weight) {
        const expensearray = [];
        roughCuts[0].expenses.forEach((element) => {
          expensearray.push(element);
        });
        const labour = await workshopModel.findOne({name: workshop.name});
        const totallabour = labour.LabourPerDiamond * noofDiamond;
        expensearray.push({ type: "workshop Labour", amount: totallabour });
        let totalexpense = 0;
        expensearray.forEach((element) => {
          totalexpense += element.amount;
        })
        const totalexpenses = {type: "total expense",amount: totalexpense}
        expensearray.unshift(totalexpenses);
        const initialCut = new cutModel({
          serialNo: serialNo + "-" + (roughCuts[0].childs.length + 1),
          weight: weight,
          state: "Polished",
          workshop: workshop,
          diamondCount: noofDiamond,
          note: "",
          owner: {
            id: roughCuts[0].owner.id,
            serialNo: roughCuts[0].owner.serialNo,
          },
           expenses: expensearray,
          childs: [],
        });
        if(initialCut)
          {
            const cut = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
              $set: {
                weight: roughCuts[0].weight - weight,
              },
            });
          }
        const cut = await initialCut.save();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const production = await ProductionModel.findOne({month: month, year: year});
        const workshopp = await workshopModel.findOne({name: workshop.name});
        const updatebalance = workshopp.balance + (noofDiamond*workshopp.LabourPerDiamond);
        const data = await workshopModel.findByIdAndUpdate(workshopp._id, {
          $set: {
            balance: updatebalance,
          },
        });
        if(!production)
        {
          const production = new ProductionModel({
          month: month,
          year: year,
          Count : noofDiamond
        });
        await production.save();
        }
        else
        {
          const data = await ProductionModel.findByIdAndUpdate(production._id, {
            $set: {
              Count: parseInt(production.Count) + parseInt(noofDiamond),
            },
          });
        }
        if (cut) {
          const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
            $push: { childs: cut },
          });
        }
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };
  static getPolishedInventory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const data = [];
      const roughCuts = await cutModel.find({ state: "Polished" });

      for (const cut of roughCuts) {
        const Owner = await diamondModel.findById(cut.owner.id);
        data.push({
          serialNo: cut.serialNo,
          weight: cut.weight,
          grade: Owner.grade,
          colour: Owner.colour,
          status: cut.state,
        });
      }
      await session.commitTransaction();
      return res.success(201, "Polished inventory fetched successfully.", data);
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
  static getRoughToSellInventory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const data = [];
      const roughCuts = await cutModel.find({ state: "RoughToSell" });

      for (const cut of roughCuts) {
        const Owner = await diamondModel.findById(cut.owner.id);
        data.push({
          serialNo: cut.serialNo,
          weight: cut.weight,
          grade: Owner.grade,
          colour: Owner.colour,
          status: cut.state,
        });
      }
      await session.commitTransaction();
      return res.success(
        201,
        "RoughToSell inventory fetched successfully.",
        data
      );
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
  static sold = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo, price, totalPrice, paymentDate, brokerage, broker, buyer, discount , weight } = req.body;
    const roughCuts = await cutModel.find({ serialNo: serialNo });
    try {
      session.startTransaction();
      if (price && totalPrice && paymentDate && brokerage && broker && buyer && discount && weight) {
        const expensearray = [];
        roughCuts[0].expenses.forEach((element) => {
          expensearray.push(element);
        });
        const soldrecord = { type: "sold", amount: totalPrice };
        expensearray.unshift(soldrecord);
        const data = await cutModel.findByIdAndUpdate(roughCuts[0]._id, {
          $set: {
            state : "Sold",
            expenses: expensearray,
          },
        });
        const payment = new paymentModel({
          inventory: {id : roughCuts._id , serialNo :serialNo},
          broker: broker,
          buyer: buyer,
          type: "credit",
          amount: totalPrice,
          date: paymentDate,
      });
      const notification = new notificationModel({
        title : "Payment alert",
        message : "Payment of Rs."+totalPrice+" recive from "+buyer.name,
        date : paymentDate
      });
      await notification.save();
      
      const paymentData = await payment.save();
        await session.commitTransaction();
        return res.success(
          201,
          "Diamond added successfully.",
          roughCuts[0]._id
        );
      } else {
        return res.error(400, "Error while adding new diamond...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, roughCuts);
    } finally {
      session.endSession();
    }
  };
  
  static profitCurrentMonth = async (req, res) => {
    try {
      const date = new Date();
      const Month = date.getMonth() + 1;
      const Year = date.getFullYear();
      
      const allcutsold = await cutModel.find({ state: "Sold" , createdAt: { $gte: new Date(Year, Month - 1, 1), $lt: new Date(Year, Month, 1) } });
      let totalprofit = 0;
      allcutsold.forEach((element) => {
        if(element.state === "Sold")
          {
              // console.log(element.expenses[0].amount)
              totalprofit += element.expenses[0].amount - element.expenses[1].amount;
            }
        
      });
      return res.success(201, "Profit fetched successfully.", totalprofit.toString());
    }
    catch (error) {
      return res.error(400, error, null);
    }
  };
      

  static totalPolished = async (req, res) => {
    try {
      const data = await cutModel.find({ state: "Polished" });
      let totalweight = 0;
      data.forEach((element) => {
        totalweight += element.weight;
      });
      return res.success(201, "Total Polished weight fetched successfully.", totalweight.toString());

    } catch (error) {
      return res.error(400, error, null);
    }
    }

  static getWorkshopInventory = async (req, res) => {
    const { id } = req.params;  
        try {
            const workshopname = await workshopModel.findById(id)
            const diamonddata = await cutModel.find({'workshop.name': workshopname.name});
            
            if (!diamonddata) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", diamonddata);
        } catch (error) {
            return res.error(400, error, null);
        }
    }


  static getInventory = async (req, res) => {
    const session = await mongoose.startSession();
    const { serialNo } = req.params;
    try {
      if (serialNo) {
        session.startTransaction();
        const cut = await cutModel.findOne({ serialNo: serialNo });
        const diamond = await diamondModel.findById(cut.owner.id);
        const data = {
          serialNo: cut.serialNo,
          broker: diamond.broker,
          seller: diamond.seller,
          workshop: cut.workshop,
          grade: diamond.grade,
          colour: diamond.colour,
          weight: cut.weight,
          diamondCount: cut.diamondCount,
          price: diamond.price,
          payment_date: diamond.payment_date,
          discount: diamond.discount,
          total_price: diamond.total_price,
          note: diamond.note,
        };
        await session.commitTransaction();
        return res.success(201, "Inventory fetched successfully.", data);
      } else {
        return res.error(400, "Fill all the details please...!", null);
      }
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };

  static deleteInventory = async () => {
    const session = await mongoose.startSession();
    const { serialNo } = req.params;
    try {
      session.startTransaction();
      const data = await cutModel.deleteOne({ serialNo: serialNo });
      await session.commitTransaction();
      return res.success(201, "Inventory fetched successfully.", data);
    } catch (error) {
      session.abortTransaction();
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };



}

export default cutController;
