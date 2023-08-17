import Course from "../models/course-model.js";

export const create = async (body) => {
    return await Course.create({...body, lessons: []});
};

export const getAll = async () => {
    return await Course.find();
};

export const findById = async (courseId) => {
    let data;
    data = await Course.findById(courseId);
    return data;
};

export const updateCourse = async (course) => {
    let updatedCourse;
    updatedCourse = await Course.findByIdAndUpdate(course._id, course, {new: true});
    return updatedCourse;
};

export const deleteCourse = async (courseId) => {
    let updatedCourse;
    updatedCourse = await Course.findByIdAndDelete(courseId);
    return updatedCourse;
};

