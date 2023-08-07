import mongoose from "mongoose";

const Course=new mongoose.Schema({
    authorId:{type:String,required:true},
    author:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    lessons: [{type: String, ref: 'Lesson'}]
});
export default mongoose.model('Course',Course);