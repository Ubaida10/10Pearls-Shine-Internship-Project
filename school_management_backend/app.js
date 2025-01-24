import express from "express";
import morgan from "morgan";


import userRouter from "./Routes/userRouter.js"
import courseRouter from "./Routes/courseRouter.js";

//creating an app using express...
const app = express();

app.use(morgan("dev"));
app.use(express.json())

app.use("/users",userRouter);

app.use("/course",courseRouter);

export default app;