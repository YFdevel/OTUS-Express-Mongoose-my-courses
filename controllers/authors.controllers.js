import express from "express";
import {checkAuthorization} from "../handlers/check-authorization.js";
import {UsersService} from "../services/users.service.js";

const authorsRouter = express.Router();

authorsRouter.get("/", checkAuthorization, async (req, res) => {
   const authorId=req?.user['id'];
    console.log(authorId)
   const author=await UsersService.findById(authorId);
    console.log(author)
    res.render("create-course", {
        isAuthor: true,
        authorId,
        author: `${author?.lastName} ${author?.firstName}`
    })
});

// coursesRouter.post("/", async (req, res) => {
//     try {
//         const data = await CourseService.create(req.body);
//         await res.json(data);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
//
// coursesRouter.get("/authors", async (req, res) => {
//     res.render("create-course", {
//         isAuthor: true
//     })
// });
//
//
// coursesRouter.get("/", async (req, res) => {
//     try {
//         const courses = Array.from(await CourseService.getAll());
//         res.render('courses',{
//             isCourses:true,
//             courses
//         })
//
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
// coursesRouter.get("/:id", async (req, res) => {
//     try {
//         const {id}=req.params;
//         if(!id){
//             res.status(400).json({message:"Не указан id"});
//         }
//         const course = await CourseService.findById(id);
//         console.log(course)
//         // await res.json(data);
//         res.render('course-detail',{
//             course
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
// coursesRouter.patch("/", async (req, res) => {
//     try {
//         const course=req.body;
//         if(!course._id){
//             res.status(400).json({message:"Не указан id"});
//         }
//         const data = await CourseService.updateCourse(course);
//         await res.json(data);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
// coursesRouter.delete("/:id", async (req, res) => {
//     try {
//         const {id}=req.params;
//         if(!id){
//             res.status(400).json({message:"Не указан id"});
//         }
//         const data = await CourseService.deleteCourse(id);
//         await res.json(data);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

export default authorsRouter;