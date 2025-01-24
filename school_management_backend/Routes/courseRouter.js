import express from "express";
import {createCourse, deleteCourse, getCourseById, getCourses, updateCourse} from "../Controller/courseController.js";

const router = express.Router();

router
    .get('/',getCourses)
    .get('/:id', getCourseById)
    .post('/',createCourse)
    .patch('/:id', updateCourse)
    .delete('/:id', deleteCourse);


export default router;
