import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./Routes/userRouter.js";
import CourseRouter from "./Routes/courseRouter.js";
import cors from "cors";




dotenv.config({path: "./config.env"});
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",UserRouter);
app.use("/course",CourseRouter);


app.get('/', (req, res)=> {
    res.send('Hello from Node API'); // Responds with a simple message on the root route
});


mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to database");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to database", error);
        process.exit(1);
    });
