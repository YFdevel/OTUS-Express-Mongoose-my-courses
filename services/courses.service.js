import Course from "../models/course-model.js";

export class CourseService {
    static create = async (body) => {
        console.log(body)
        const {authorId, author, title, description} = body;
        return await Course.create({authorId, author:author, title, description,lessons:[]});
    };

    static getAll = async () => {
        let data;
        data = Course.find();
        return data;
    };

    static findById = async (courseId) => {
        let data;
        data = await Course.findById(courseId);
        return data;
    };

    static updateCourse = async (course) => {
        let updatedCourse;
        updatedCourse = await Course.findByIdAndUpdate(course._id, course, {new: true});
        return updatedCourse;
    };

    static deleteCourse = async (courseId) => {
        let updatedCourse;
        updatedCourse = await Course.findByIdAndDelete(courseId);
        return updatedCourse;
    };
}
