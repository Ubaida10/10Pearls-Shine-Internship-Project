import express from "express";
import {createCourse, deleteCourse, getCourseById, getCourseByName, getCourses, updateCourse} from "../Controller/courseController.js";

const router = express.Router();

router
    .get('/',getCourses)
    .get('/id/:id', getCourseById)
    .get('/name/:courseName', getCourseByName)
    .post('/',createCourse)
    .patch('/:id', updateCourse)
    .delete('/:id', deleteCourse);


export default router;
