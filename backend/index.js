import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({});

const app = express();

// app.get("/home", (req, res)=>{
//     return res.status(200).json({
//         message: "It is a homapage",
//         success: true
//     })
// })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "https://job-portal-website-frontend-0nx0.onrender.com",
    credentials: true
}));

connectDb();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.Port || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});