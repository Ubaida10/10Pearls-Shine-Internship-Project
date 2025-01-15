import express from "express";
import {enrollInCourse, login, register, getUserCourses, getUserById} from "../Controller/userController.js"


const router = express.Router();

router
    .post('/login', login)
    .post('/register', register)
    .post('/enroll', enrollInCourse)
    .get('/getCourses', getUserCourses)
    .get('/getUser', getUserById);
export default router;