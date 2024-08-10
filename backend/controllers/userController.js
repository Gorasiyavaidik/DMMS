import userModel from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import axios from "axios";
import JWTHelper from "../utils/jwtHelper.js";
import transporter from "../config/emailConfig.js";

class userController {
    static userRegistration = async (req, res) => {
        const { name, email, mobile, password, confPassword, tc } = req.body;
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const user = await userModel.findOne({
                email: email,
            });
            if (user) {
                return res.error(400, "Email already exists!", null);
            } else {
                if (name && email && mobile && password && confPassword && tc) {
                    if (password === confPassword) {
                        const salt = await bcrypt.genSalt(10);
                        const hashPass = await bcrypt.hash(password, salt);
                        const newUser = new userModel({
                            name: name,
                            email: email,
                            mobile: mobile,
                            password: hashPass,
                            tc: tc
                        });
                        const data = await newUser.save();
                        session.commitTransaction();
                        return res.success(201, "User registered successfully.", data);
                    } else {
                        return res.error(400, "Confirm Password must be the same as password!", null);
                    }
                } else {
                    return res.error(400, "All fields are required!", null);
                }
            }
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            if (email && password) {
                const user = await userModel.findOne({
                    email: email,
                });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) {
                        const accessToken = JWTHelper.createAccessToken(user._id);
                        const refreshToken = JWTHelper.createRefreshToken(user._id);
                        const data = {
                            Name: user.name,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        };
                        await session.commitTransaction();
                        return res.success(201, "User logged in successfully.", data);
                    } else {
                        return res.error(400, "Email or Password incorrect!", null);
                    }
                } else {
                    return res.error(400, "User not registered!", null);
                }
            } else {
                return res.error(400, "All fields are required!", null);
            }
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static changeUserPassword = async (req, res) => {
        const session = await mongoose.startSession();
        const { password, confPassword } = req.body;
        try {
            if (password && confPassword) {
                if (password === confPassword) {
                    session.startTransaction();
                    const salt = await bcrypt.genSalt(10);
                    const hashPass = await bcrypt.hash(password, salt);
                    const user = req.user;
                    await userModel.findByIdAndUpdate(user._id, {
                        $set: { password: hashPass },
                    }, session);
                    await session.commitTransaction();
                    return res.success(201, "Password Reset Successfully", user.name);
                } else {
                    return res.error(400, "Confirm Password must be same as password!", null);
                }
            } else {
                return res.error(400, "All fields are required!", null);
            }
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static loggedUser = async (req, res) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const user = await userModel.findById(req.user._id);

            await session.commitTransaction();
            return res.success(201, "Get logged user successfully.", user);
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession()
        }
    };

    static userPasswordResetEmail = async (req, res) => {
        const session = await mongoose.startSession();
        const { email } = req.body;
        try {
            session.startTransaction();
            if (email) {
                const user = await userModel.findOne({
                    email: email,
                });
                if (user) {
                    const token = JWTHelper.createUserPasswordChangeToken(user._id);
                    const link = `http://127.0.0.1:8000/api/user/userPasswordReset/${token}`;

                    const info = await transporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user.email,
                        subject: "DMMS Project Password Reset",
                        html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <style>
                          
            
              @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600&display=swap'); 
              
              @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
            
            
            
            .first{
                display: flex;
                align-items: center;
                gap: 28px;
                
            }
            .aa{
                color:#FF4858 ;
                font-size:2vw ;
                font-family: 'Poppins', sans-serif;
                font-weight: bold;
            }
            .main{
                margin: 50px;
                
            }
            .second{
                margin-top: 50px;
            }
            .second p{
                font-size: 1.3vw;
                font-family: 'Poppins', sans-serif;
                font-weight: lighter;
            
            
            }
            
            button{
                color: white;
                border: 0;
                font-size: 1.2vw;
                border-radius: 5px;
                background-color: #FF4858;
                padding: 15px 25px; 
            }
            
            button:hover{
             
                background-color: #fe626f;
                transition: 0.3s;
            }
            
            .logo img{
                width:4vw;
            }
            button:active{
                background-color: #f63444;
                transition: 0.3s;
            
            }
            
            @media (max-width:412px){
            .main{
                transform: scale(1.3);
            }
            
            .first{
                display: flex;
                align-items: center;
                gap: 18px;
            }
            
            .logo img{
                width:35px;
            }
            
            .aa{
                color:#FF4858 ;
                font-size:3.5vw ;
                font-family: 'Roboto Slab', serif;
            }
            
            .second{
                margin-top: 20px;
            }
            
            .second p{
                font-size: 2.8vw;
                font-family: 'Poppins', sans-serif;
                font-weight: lighter;
            
            
            }
            
            
            button{
                color: white;
                border: 0;
                font-size: 3.3vw;
                border-radius: 5px;
                background-color: #FF4858;
                padding: 12px 20px; 
            }
            
            button:hover{
             
                background-color: #fe626f;
                transition: 0.3s;
            }
            }
                          </style>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>DMMS PROJECT</title>
                        </head>
                        <body>
                            <div class="main">
                        
                                <div class="first">
                                    <div class="logo">
                                        <img src="/public/scripts/img/Apclogo.svg">
                                    </div>
                                    <div class="aa">
                                        <p>DMMS</p>  
                                        
                                    </div>
                        
                                </div>
                        <hr />  
                                <div class="second">
                                    <p>Hello ${user.name}, </p>
                                    <p>We've received a request to reset your password. </p>
                                    <p>If You didn't make the request, Just ignore the message. </p>
                                    <p>Otherwise, You can... </p>
                             <a href="${link}"> <button>Reset your password</button></a> 
                                    <br />
                                    <p>Thanks,</p>
                                    <p style="margin-top: -15px;"></p>
                                </div>
                            </div>
                        
                        
                        </body>
                        </html> `
                    });

                    await session.commitTransaction();
                    return res.success(201, "Email sent successfully.", info);
                } else {
                    return res.error(400, "Email does not exist!", null);
                }
            } else {
                return res.error(400, "All fields are required!", null);
            }
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.send(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static userPasswordReset = async (req, res) => {
        const session = await mongoose.startSession();
        const { password, confPassword } = req.body;
        const { token } = req.params;
        try {
            session.startTransaction();
            const user = await JWTHelper.verifyUserPasswordChangeToken(token);
            if (user) {
                const userToken = JWTHelper.createAccessToken(user._id);
                const body = {
                    password: password,
                    confPassword: confPassword,
                };
                const headers = {
                    Authorization: 'Bearer ' + userToken,
                };
                const response = await axios.post('http://127.0.0.1:8000/api/user/changeUserPassword', body, { headers: headers });
                await session.commitTransaction();
                return res.send(201, "Password reset request sent successfully", response.data);
            } else {
                return res.error(400, "Token expired!", null);
            }
        } catch (error) {
            session.abortTransaction();
            // console.log("Transaction aborted : " + error);
            return res.send(400, error, null);
        } finally {
            session.endSession();
        }
    };
}

export default userController;