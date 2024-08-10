import mongoose from "mongoose";
import staffModel from "../models/Staff.js";
import attendanceModel from "../models/Attendance.js";
import cutModel from "../models/Cut.js";

class attendanceController {
  static addAttendance = async (req, res) => {
    const session = await mongoose.startSession();
    let staff_id, date, Presence, serialNo;

    if (req.body.serialNo) {
      ({ staff_id, date, Presence, serialNo } = req.body);
      const roughCuts = await cutModel.findOne({ serialNo: serialNo });
      if (!roughCuts) {
        return res.error(404, "Cut not found.", null);
      }
      const staff = await staffModel.findOne({ _id: staff_id });
      const expensearray = [];
      let charge = 0;
      let flag = false;
      roughCuts.expenses.forEach((element) => {
        if (element.type === "Sorting") {
          charge = element.amount;
          charge += staff.salary / 26;
          expensearray.push({ type: "Sorting", amount: charge });
          flag = true;
        } else {
          
          expensearray.push(element);
        }
      });
      if(!flag){
        charge = staff.salary / 26;
        expensearray.push({ type: "Sorting", amount: charge });
    }
      const updatedCut = await cutModel.findOneAndUpdate(
        { serialNo: serialNo },
        {
          $set: {
            expenses: expensearray,
          },
        }
      );
      let balance = staff.balance;
      balance += staff.salary / 26;
      const staffupdate = await staffModel.findOneAndUpdate(
        { _id: staff_id },
        {
          // Corrected the query syntax
          $set: {
            balance: balance,
          },
        }
      );
      const sortingcharge = { type: "sorting", amount: charge };
    } else {
      ({ staff_id, date, Presence } = req.body);
    }
    date = new Date(date);
    let updatedAttendance = null;

    try {
      session.startTransaction();

      const existingDocumentQuery = {
        staff_id: staff_id,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };

      const existingDocument = await attendanceModel
        .findOne(existingDocumentQuery)
        .lean();
      if (existingDocument) {
        const existingAttendance = existingDocument.attendance || {};
        updatedAttendance = {
          ...existingAttendance,
          [date.getDate()]: Presence === "Present" ? serialNo : "Absent",
        };

        await attendanceModel.findOneAndUpdate(
          existingDocumentQuery,
          { attendance: updatedAttendance },
          { new: true }
        );
      } else {
        const newAttendance = new attendanceModel({
          staff_id: staff_id,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          attendance: {
            [date.getDate()]: Presence === "Present" ? serialNo : "Absent",
          },
        });
        await newAttendance.save();
      }

      await session.commitTransaction();
      // Return the updated or newly created document

      return res.success(
        201,
        "Attendance added successfully.",
        updatedAttendance
      );
    } catch (error) {
      session.abortTransaction();
      // console.log(serialNo, Presence, updatedAttendance);
      // console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };

  static getStaffAttendance = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await attendanceModel.find({ staff_id: id  });
      // console.log("hello")
      if (!data) {
        return res.error(404, "Attendance not found.", null);
      }
      return res.success(200, "Attendance found.", data);
    } catch (error) {
      return res.error(400, error, null);
    }
  };
}

export default attendanceController;
