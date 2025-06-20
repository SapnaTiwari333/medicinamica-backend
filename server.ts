import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import patientRoutes from './routes/patientRoutes';
//import doctorRoutes from './routes/doctorRoutes';
import chatRoutes from "./routes/chatRoutes";
import { connectDb } from "./config/mongoDbConnection";

dotenv.config();

const app=express();

//connection of mongoDb
connectDb();

//security middlewares

app.use(cors());

app.use(helmet()); // Sets secure HTTP headers

app.use(express.json()); // Enable CORS

app.use(morgan("dev")); // Logging


const PORT=process.env.PORT || 3000;



app.use("/api/patients",patientRoutes);

//app.use("/api/doctors",doctorRoutes);

app.use("/api/chats",chatRoutes);


app.listen(PORT,()=>{
    console.log(`sever listening on port ${PORT}`);
});