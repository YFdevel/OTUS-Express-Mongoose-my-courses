import Role from "../models/role-model.js";

export const create = async (body) => {
    const {name} = body;
    let role = await Role.findOne({name});
    if (!role) {
        role = await Role.create({name});
    }
    return role
};


export const getAll = async () => {
    return  await Role.find();
};

export const findById = async (roleId) => {
    let data;
    data = await Role.findById(roleId);
    return data;
};

export const updateRole = async (role) => {
    let updatedRole;
    updatedRole = await Role.findByIdAndUpdate(role._id, role, {new: true});
    return updatedRole;
};

export const deleteRole = async (roleId) => {
    let updatedRole;
    updatedRole = await Role.findByIdAndDelete(roleId);
    return updatedRole;
};

