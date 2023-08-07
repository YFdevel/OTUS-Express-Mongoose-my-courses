import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import Role from "../models/role-model.js";


export class UsersService {
    static create = async (body) => {
        const {firstNameReg, lastNameReg, emailReg, passwordReg} = body;
        const user = await User.findOne({email: emailReg});
        let validPassword = null;
        if (user) {
            validPassword = bcrypt.compareSync(passwordReg, user?.password);
        }
        if (validPassword) {
            return null
        }
        const hashPass = bcrypt.hashSync(passwordReg, 7);
        const userRole = await Role.findOne({name: "USER"});
        return await User.create({
            firstName: firstNameReg,
            lastName: lastNameReg,
            email: emailReg,
            password: hashPass,
            roles: [userRole.name]
        });
    };

    static login = async (body) => {
        const {emailAuth, passwordAuth} = body;
        const user = await User.findOne({email: emailAuth});
        let validPassword = null;
        if (user) {
            validPassword = bcrypt.compareSync(passwordAuth, user?.password);
        }
        if (validPassword) {
            return user
        }else{
            return null;
        }

    };

    static getAll = async () => {
        let data;
        data = await User.find();
        return data;
    };

    static findById = async (userId) => {
        let data;
        data = await User.findById(userId);
        return data;
    };

    static updateUser = async (user) => {
        let updatedUser;
        updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true});
        return updatedUser;
    };

    static deleteUser = async (userId) => {
        let updatedUser;
        updatedUser = await User.findByIdAndDelete(userId);
        return updatedUser;
    };
}
