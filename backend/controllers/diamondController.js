import mongoose from "mongoose";
import diamondModel from "../models/Diamond.js";
import individualModel from "../models/Individual.js";
import cutModel from "../models/Cut.js";
import paymentModel from "../models/Payment.js";
import notificationModel from "../models/Notification.js";

class diamondController {
    static addDiamond = async (req, res) => {
        const session = await mongoose.startSession();
        const { serialNo, weight, broker, seller, grade, colour, price, payment_date, discount, total_price, note } = req.body;
        try {
            session.startTransaction();
            if (serialNo && weight && broker && seller && grade && colour && price && payment_date && discount && total_price) {
                const expensearray = [];
                expensearray.push({ type: "Rough Price", amount: (total_price/weight) });
                const newDiamond = new diamondModel({
                    serialNo: serialNo,
                    weight: weight,
                    broker: broker,
                    seller: seller,
                    grade: grade,
                    colour: colour,
                    price: price,
                    payment_date: payment_date,
                    discount: discount,
                    total_price: total_price,
                    note: note,
                    childs: []
                });
                const diamond = await newDiamond.save();
                const payment = new paymentModel({
                    inventory: {id : diamond._id , serialNo :serialNo},
                    broker: broker,
                    seller: seller,
                    type: "Debit",
                    amount: total_price,
                    date: payment_date,
                });
                const notification = new notificationModel({
                    title: "Payment alert",
                    message: "Payment of " + total_price + " will have to made to " + seller.name + " for diamond " + serialNo,
                    date: payment_date,
                });
                const notificationData = await notification.save();

                const paymentData = await payment.save();
                if (diamond) {
                    const initialCut = new cutModel({
                        serialNo: serialNo,
                        weight: weight,
                        state: "Rough",
                        note: "Initial Cut",
                        owner: {
                            id: diamond._id,
                            serialNo: diamond.serialNo
                        },
                        expenses: expensearray,
                        childs: []
                    });
                    const cut = await initialCut.save();
                    if (cut) {
                        const data = await diamondModel.findByIdAndUpdate(diamond._id, {
                            $set: {
                                child: cut
                            }
                        });
                        await session.commitTransaction();
                        return res.success(201, "Diamond added successfully.", data);
                    } else {
                        return res.error(400, "Error while adding initial cut...!", null);
                    }
                } else {
                    return res.error(400, "Error while adding new diamond...!", null);
                }

            } else {
                return res.error(400, "Fill all the details please...!", null);
            }

        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession()
        }
    };

    static editDiamond = async (req, res) => {
        const session = await mongoose.startSession();
        const { serialNo, weight, broker, seller, grade, colour, price, payment_date, discount, total_price, note } = req.body;
        try {
            session.startTransaction();
            if (serialNo && weight && broker && seller && grade && colour && price && payment_date && discount && total_price) {
                const diamond = await diamondModel.updateOne({serialNo: serialNo}, 
                    {
                    $set: {
                        weight: weight,
                        broker: broker,
                        seller: seller,
                        grade: grade,
                        colour: colour,
                        payment_date: payment_date,
                        discount: discount,
                        total_price: total_price,
                        note: note
                    }
                });
                const cut = await cutModel.updateOne({serialNo: serialNo}, 
                    {
                    $set: {
                        weight: weight,
                        broker: broker,
                        seller: seller,
                        note: note
                    }
                });

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

    static deleteDiamond = async (req, res) => {
        const { serialNo } = req.params;
        try {
            const cut = await cutModel.deleteOne({serial:serialNo});
            const diamond = await diamondModel.deleteOne({serialNo: serialNo});
            if (!diamond) {
                return res.error(404, "Diamond not found.", null);
            }
            return res.success(200, "Diamond deleted successfully.", diamond);
        } catch (error) {
            return res.error(400, error, null);
        }
    };


    static getSellerDiamond = async(req, res) => {
        const { id } = req.params;  
        try {
            
            const diamonddata = await diamondModel.find({'seller.id': id});
            
            if (!diamonddata) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", diamonddata);
        } catch (error) {
            return res.error(400, error, null);
        }
    };
    static getBrokerDiamond = async(req, res) => {
        const { id } = req.params;  
        try {
            // console.log(id)
           const payments = await paymentModel.find({'broker.id': id});
           const diamonddata = [];
           const diamonddata2 = [];
           for (const item of payments) {
            if(item.type === "Debit"){
               const cut = await cutModel.find({'serialNo': item.inventory.serialNo});
               diamonddata.push(cut[0]);
               console.log(cut[0].serialNo)
            }
            else if(item.type === "credit"){
                const cut = await cutModel.find({'serialNo': item.inventory.serialNo});
                diamonddata2.push(cut[0]);
                console.log(cut[0].serialNo)
            }
           }
           const data ={
            diamonddata,
            diamonddata2
           }
            return res.success(200, "Individual found.", data);
        } catch (error) {
            console.log(error)
            return res.error(400, error, null);
        }
    };
    static getBuyerDiamond = async(req, res) => {
        const { id } = req.params;  
        try {
            const diamonddata = await paymentModel.find({'buyer.id': id});
            const diamondResults = [];
            for (const item of diamonddata) {
                const cut = await cutModel.find({'serialNo': item.inventory.serialNo});
                const diamond = await diamondModel.find({'serialNo': cut[0].owner.serialNo});
                if (cut.length > 0) {
                    diamondResults.push({
                        serialNo: cut[0].serialNo,
                        weight: cut[0].weight,
                        price: cut[0].expenses[0].amount/cut[0].weight,
                        broker: item.broker,
                        grade: diamond[0].grade,
                        payment_date: item.date,
                    });
                }
            }
            if (!diamonddata) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", diamondResults);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getAllDiamond = async(req, res) => {
        try {
            const diamonddata = await diamondModel.find();
            if (!diamonddata) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", diamonddata);
        } catch (error) {
            return res.error(400, error, null);
        }
    }


    static getAllRelatedDiamond = async(req, res) => {
        const { serialNo } = req.body;
        try {
            const diamond = await diamondModel.find({serialNo: serialNo});
            if (!diamond) {
                return res.error(404, "Diamond not found.", null);
            }
            const cut = await cutModel.find({owner: {id: diamond[0]._id, serialNo: diamond[0].serialNo}});
            // console.log(cut);
            return res.success(200, "Diamond found.",  cut);
        } catch (error) {
            return res.error(400, error.message , error);
        }
    }
    
}

export default diamondController;