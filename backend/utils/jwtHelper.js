import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

class JWTHelper {
  static createAccessToken = (id) => {
    return jwt.sign({ userID: id }, process.env.JWT_SECRET_KEY1, {
      expiresIn: "1d",
    });
  };

  static verifyUserAccessToken = async (token) => {
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY1);
    const user = await userModel.findById(userID).select("-password");
    return user;
  };

  static createRefreshToken = (id) => {
    return jwt.sign({ userID: id }, process.env.JWT_SECRET_KEY2, {
      expiresIn: "1y",
    });
  };

  static verifyUserRefreshToken = async (token) => {
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY2);
    const user = await userModel.findById(userID).select("-password");
    return user;
  };

  static createUserPasswordChangeToken = (id) => {
    return jwt.sign({ userID: id }, process.env.JWT_SECRET_KEY3, {
      expiresIn: "15m",
    });
  }

  static verifyUserPasswordChangeToken = async (token) => {
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY3);
    const user = await userModel.findById(userID).select("-password");
    return user;
  };
}

export default JWTHelper;
