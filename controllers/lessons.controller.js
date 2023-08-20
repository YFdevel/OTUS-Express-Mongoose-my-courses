import express from "express";
import {
    create,
    createCommentToLesson,
    getAll,
    getLessonsByCourseId,
    findById,
    updateCourse,
    deleteCourse
} from "../services/lessons.service.js";
import {tryCatch} from "../utils/tryCatch.js";
import {checkAccess} from "../utils/check-access.js";


const lessonsRouter = express.Router();


lessonsRouter.get('/create/:courseId', checkAccess(), tryCatch(async (req, res) => {
    const authorId = req?.user['id'];
    const {courseId} = req.params;
    res.render("create-lesson", {
        authorId,
        courseId
    })
}));

lessonsRouter.post("/", tryCatch(async (req, res) => {
    const data = await create(req.body, req.files?.picture);
    res.status(201).redirect(`/lessons/by-course/${req.body.courseId}/${req.body.authorId}`);
}));

lessonsRouter.post("/create-comment/:lessonId", checkAccess(), tryCatch(async (req, res) => {
    const {courseId, authorId} = req.query;
    if (!courseId && !authorId) {
        res.status(400).json({message: "Не указаны id курса и автора курса"});
    }
    const authorCommentId = req.user?.id;
    const {lessonId} = req.params;
    const comment = await createCommentToLesson(req.body, lessonId, authorCommentId);
    await res.status(200).redirect(`/lessons/by-course/${courseId}/${authorId}`);
}));

lessonsRouter.get("/", tryCatch(async (req, res) => {
    const courses = await getAll();
    res.status(200).json(courses);
}));

lessonsRouter.get("/by-course/:courseId/:authorId", checkAccess(), tryCatch(async (req, res) => {
    const {courseId, authorId} = req.params;
    const userId = req?.user['id'];
    const lessons = await getLessonsByCourseId(courseId);
    res.render('lessons', {
        isCourses: true,
        lessons,
        courseId,
        authorId: authorId === userId ? authorId : null
    })
}));


lessonsRouter.get("/:id", tryCatch(async (req, res) => {
    const {id} = req.params;
    const lesson = await findById(id);
    await res.json(lesson);
}));

lessonsRouter.patch("/", tryCatch(async (req, res) => {
    const course = req.body;
    if (!course._id) {
        res.status(400).json({message: "Не указан id"});
    }
    const data = await updateCourse(course);
    await res.json(data);
}));

lessonsRouter.delete("/:id", tryCatch(async (req, res) => {
    const {id} = req.params;
    const data = await deleteCourse(id);
    await res.json(data);
}));

export default lessonsRouter;