import Lesson from "../models/lesson-model.js";
import {FileService} from "./file.service.js"
import {findById as findUserById} from "./users.service.js";


export const create = async (body, picture) => {
    const fileName = await FileService.saveFile(picture);
    return await Lesson.create({...body, videoUrl: fileName});
};

export const createCommentToLesson = async (body, id, authorCommentId) => {
    const {message} = body;
    const authorComment = await findUserById(authorCommentId);
    const authorCommentName = authorComment.lastName + " " + authorComment.firstName;
    const lesson = await Lesson.findById(id);
    lesson.comments = [...lesson.comments, {
        message,
        authorCommentId,
        authorCommentName,
        date: new Date().toLocaleString()
    }]
    return await Lesson.findByIdAndUpdate(lesson._id, lesson, {new: true});
};

export const getAll = async () => {
    let data;
    data = Lesson.find();
    return data;
};

export const getLessonsByCourseId = async (courseId) => {
    let data;
    data = Lesson.find({courseId});
    return data;
};

export const findById = async (courseId) => {
    let data;
    data = await Lesson.findById(courseId);
    return data;
};

export const updateCourse = async (course) => {
    let updatedCourse;
    updatedCourse = await Lesson.findByIdAndUpdate(course._id, course, {new: true});
    return updatedCourse;
};

export const deleteCourse = async (courseId) => {
    let updatedCourse;
    updatedCourse = await Lesson.findByIdAndDelete(courseId);
    return updatedCourse;
};

