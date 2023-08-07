import mongoose from "mongoose";

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    comments: [{type: String, ref: 'Comment'}]
});
export default mongoose.model('User', User);