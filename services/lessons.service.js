import Lesson from "../models/lesson-model.js";
import {FileService} from "./file.service.js"
import {UsersService} from "./users.service.js";

export class LessonsService {
    static create = async (body, picture) => {
        const {authorId, courseId, title, description} = body;
        const fileName = await FileService.saveFile(picture);
        console.log(fileName)
        return await Lesson.create({authorId, courseId, title, description, videoUrl: fileName});
    };

    static createCommentToLesson = async (body, id,authorCommentId) => {
        const {message} = body;
        const authorComment=await UsersService.findById(authorCommentId);
        const authorCommentName= authorComment.lastName +" "+ authorComment.firstName;
        const lesson = await Lesson.findById(id);
       lesson.comments= [...lesson.comments, {message, authorCommentId,authorCommentName, date: new Date().toLocaleString()}]
        return await Lesson.findByIdAndUpdate(lesson._id, lesson, {new: true});
    };

    static getAll = async () => {
        let data;
        data = Lesson.find();
        return data;
    };

    static getLessonsByCourseId = async (courseId) => {
        let data;
        data = Lesson.find({courseId});
        return data;
    };

    static findById = async (courseId) => {
        let data;
        data = await Lesson.findById(courseId);
        return data;
    };

    static updateCourse = async (course) => {
        let updatedCourse;
        updatedCourse = await Lesson.findByIdAndUpdate(course._id, course, {new: true});
        return updatedCourse;
    };

    static deleteCourse = async (courseId) => {
        let updatedCourse;
        updatedCourse = await Lesson.findByIdAndDelete(courseId);
        return updatedCourse;
    };
}
