import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import Role from "../models/role-model.js";


export const create = async (body) => {
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

export const login = async (body) => {
    const {emailAuth, passwordAuth} = body;
    const user = await User.findOne({email: emailAuth});
    let validPassword = null;
    if (user) {
        validPassword = bcrypt.compareSync(passwordAuth, user?.password);
    }
    if (validPassword) {
        return user
    } else {
        return null;
    }

};

export const getAll = async () => {
    return await User.find();
};

export const findById = async (userId) => {
    return await User.findById(userId);
};

export const updateUser = async (user) => {
    let updatedUser;
    updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true});
    return updatedUser;
};

export const deleteUser = async (userId) => {
    let updatedUser;
    updatedUser = await User.findByIdAndDelete(userId);
    return updatedUser;
};

