import mongoose from "mongoose";
import workshopModel from "../models/Workshop.js";

class workshopController {
    static addWorkshop = async (req, res) => {
        const session = await mongoose.startSession();
        const { name,ownername, number, balance, address, LabourPerDiamond, note } = req.body;
        try {
            session.startTransaction();
            const newWorkshop = new workshopModel({
                name: name,
                owner :{
                    Name : ownername,
                    number : number,
                },
                LabourPerDiamond: LabourPerDiamond ,
                balance: balance || 0,
                address: address,
                note: note
            });
            const data = await newWorkshop.save();

            await session.commitTransaction();
            return res.success(201,  "Workshop added successfully.", data);
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static getAllWorkshop = async (req, res) => {
        try {
            const data = await workshopModel.find({});
            return res.success(200, "All broker found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getIndividualWorkshop = async(req,res) => {
        const { id } = req.params;
        try {
            const data = await workshopModel.findById(id);
            if (!data) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static clearBalance = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await workshopModel.findByIdAndUpdate(id, { balance: 0 }, { new: true });
            if (!data) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Balance cleared.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    
}

export default workshopController;