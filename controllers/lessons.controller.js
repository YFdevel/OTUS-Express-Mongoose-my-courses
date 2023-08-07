import express from "express";
import {LessonsService} from "../services/lessons.service.js";
import {checkAuthorization} from "../handlers/check-authorization.js";
import {UsersService} from "../services/users.service.js";
import {CommentsService} from "../services/comments.service.js";

const lessonsRouter = express.Router();

// lessonsRouter.get('/', (req, res) => {
//     res.render("lessons")
// });

lessonsRouter.get('/create', checkAuthorization, async (req, res) => {
    const authorId=req?.user['id'];
    res.render("create-lesson",{
        authorId,
        courseId:req.query?.courseId
    })
});

lessonsRouter.post("/", async (req, res) => {
    try {
        const data = await LessonsService.create(req.body, req.files?.picture);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

lessonsRouter.post("/create-comment/:id", checkAuthorization, async (req, res) => {
    try {
        const authorCommentId=req.user?.id;
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: "Не указан id"});
        }
        const comment = await LessonsService.createCommentToLesson(req.body,id,authorCommentId);
        await res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

lessonsRouter.get("/", async (req, res) => {
    try {
        const courses = Array.from(await LessonsService.getAll());
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
});

lessonsRouter.get("/by-course/:id", checkAuthorization, async (req, res) => {
    try {
        const courseId=req.params?.id;
        const userId = req?.user['id'];
        const authorId = req.query?.authorId;
        const lessons = Array.from(await LessonsService.getLessonsByCourseId(courseId));
        res.render('lessons', {
            isCourses: true,
            lessons,
            courseId,
            authorId: authorId === userId ? authorId : null

        })
    } catch (err) {
        res.status(500).json(err);
    }
});


lessonsRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: "Не указан id"});
        }
        const lesson = await LessonsService.findById(id);
        await res.json(lesson);
    } catch (err) {
        res.status(500).json(err);
    }
});
lessonsRouter.patch("/", async (req, res) => {
    try {
        const course = req.body;
        if (!course._id) {
            res.status(400).json({message: "Не указан id"});
        }
        const data = await LessonsService.updateCourse(course);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});
lessonsRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: "Не указан id"});
        }
        const data = await LessonsService.deleteCourse(id);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default lessonsRouter;