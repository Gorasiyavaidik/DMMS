import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import os from "os";
import cluster from "cluster";
import connectDB from "./config/connectdb.js";
import { ResponseHandler } from "./middlewares/response.middleware.js";
import userRouter from "./routes/userRoutes.js";
import diamondRouter from "./routes/diamondRoutes.js";
import individualRouter from "./routes/individualRoutes.js";
import cutRouter from "./routes/cutRoutes.js";
import staffRouter from "./routes/staffRoutes.js";
import workshopRouter from "./routes/workshopRoutes.js"
import attedanceRouter from "./routes/attedanceRoutes.js";
import productionRouter from "./routes/ProductionRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import notificationRouter from "./routes/notificationRouter.js";

dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;
const databaseURL = process.env.DATABASE_URL;

const numCPUs = os.cpus().length;
const app = express();
app.use(express.json());

if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`);
    console.log(numCPUs);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    app.use(morgan("dev"));
    app.use(
        cors({
            origin: [
                "http://localhost:5173",
                "http://192.168.33.180:5173",
                "https://miniproject-dmms.web.app/",
            ],
        })
    );
    app.use(ResponseHandler);
    app.use("/api/user", userRouter);
    app.use("/api/diamond", diamondRouter);
    app.use("/api/individual", individualRouter);
    app.use("/api/staff", staffRouter);
    app.use("/api/workshop", workshopRouter);
    app.use("/api/cut", cutRouter);
    app.use("/api/attandance", attedanceRouter);
    app.use("/api/production", productionRouter);
    app.use("/api/payment", paymentRouter);
    app.use("/api/notification",notificationRouter);
    app.listen(port, () => {
        console.log("Server listning at " + url + port);
    });
}

connectDB(databaseURL);

