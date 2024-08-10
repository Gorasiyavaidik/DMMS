import mongoose from "mongoose";
import individualModel from "../models/Individual.js";
import diamondModel from "../models/Diamond.js";

class individualController {
    static addIndividual = async (req, res) => {
        const session = await mongoose.startSession();
        const { name, number, type, balance, address, note } = req.body;
        try {
            session.startTransaction();
            const newIndividual = new individualModel({
                name: name,
                number: number,
                type: type,
                balance: balance || 0,
                address: address,
                note: note
            });
            const data = await newIndividual.save();

            await session.commitTransaction();
            return res.success(201, type + " added successfully.", data);
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    //API for displaying individuals

    static getAllBroker = async (req, res) => {
        try {
            const data = await individualModel.find({ type: "Broker" });
            return res.success(200, "All broker found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getAllSeller = async (req, res) => {
        try {
            const data = await individualModel.find({ type: "Seller" });
            return res.success(200, "All seller found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getAllBuyer = async (req, res) => {
        try {
            const data = await individualModel.find({ type: "Buyer" });
            return res.success(200, "All buyer found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };

     //API for dropdown selections

     static getAllBrokers = async (req, res) => {
        try {
            const data = await individualModel.find({ type: "Broker" }).select("name");
            return res.success(200, "All broker found.", data.map(doc => {
                return { id: doc._id, name: doc.name };
              }));
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getAllSellers = async (req, res) => {
        try {
            const data = await individualModel.find({ type: "Seller" }).select("name");
            return res.success(200, "All seller found.", data.map(doc => {
                return { id: doc._id, name: doc.name };
              }));
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getAllBuyers = async (req, res) => {
        try {
            const data = await individualModel.find({ type: "Buyer" }).select("name");
            return res.success(200, "All buyer found.", data.map(doc => {
                return { id: doc._id, name: doc.name };
              }));
        } catch (error) {
            return res.error(400, error, null);
        }
    };

    static getSingleIndividual = async(req, res) => {
        const { id } = req.params;
        try {
            const data = await individualModel.findById(id);
            if (!data) {
                return res.error(404, "Individual not found.", null);
            }
            return res.success(200, "Individual found.", data);
        } catch (error) {
            return res.error(400, error, null);
        }
    };


}

export default individualController;