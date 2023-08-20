import mongoose from "mongoose";

const Lesson=new mongoose.Schema({
    courseId:{type:String,required:true},
    authorId:{type:String,required:true},
    videoUrl:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String},
    comments: [{
        message: {type: String, required: true},
        authorCommentId: {type: String, required: true},
        authorCommentName: {type: String, required: true},
        date: {type: String, required: true}
    }]
});
export default mongoose.model('Lesson',Lesson);