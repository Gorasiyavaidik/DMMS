import mongoose from "mongoose";
import diamondModel from "../models/Diamond.js";
import staffModel from "../models/Staff.js";

class staffController {
    static addStaff = async (req, res) => {
        const session = await mongoose.startSession();
        const { name, number, salary, balance, address, note } = req.body;
        try {
            session.startTransaction();
            const newStaff = new staffModel({
                name: name,
                number: number,
                salary : salary,
                balance: balance || 0,
                address: address,
                note: note
            });
            const data = await newStaff.save();

            await session.commitTransaction();
            return res.success(201,  "staff added successfully.", data);
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static getAllStaff = async (req, res) => {
        try {
            const data = await staffModel.find({});
            return res.success(200, "All broker found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };
    
    static getIndividualStaff = async(req,res) => {
        const { id } = req.params;
        try {
            const data = await staffModel.findById(id);
            if (!data) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    


}

export default staffController;