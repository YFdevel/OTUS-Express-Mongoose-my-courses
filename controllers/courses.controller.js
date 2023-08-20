import express from "express";
import {create, getAll, findById, updateCourse, deleteCourse} from "../services/courses.service.js";
import {tryCatch} from "../utils/tryCatch.js";

const coursesRouter = express.Router();

coursesRouter.post("/", tryCatch(async (req, res) => {
    const data = await create(req.body);
    res.status(201).json({data});
}));

coursesRouter.get("", tryCatch(async (req, res) => {
    const courses = await getAll();
    res.render('courses', {
        isCourses: true,
        courses
    })
}));
coursesRouter.get("/:id", tryCatch(async (req, res) => {
    const {id} = req.params;
    const course = await findById(id);
    res.render('course-detail', {
        course
    })
}));
coursesRouter.patch("/", tryCatch(async (req, res) => {
    const course = req.body;
    if (!course._id) {
        res.status(400).json({message: "Не указан id"});
    }
    const data = await updateCourse(course);
    await res.json(data);
}));
coursesRouter.delete("/:id", tryCatch(async (req, res) => {
    const {id} = req.params;
    const data = await deleteCourse(id);
    await res.json(data);
}));

export default coursesRouter;