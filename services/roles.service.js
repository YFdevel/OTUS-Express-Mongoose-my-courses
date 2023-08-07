import Role from "../models/role-model.js";
export class RolesService{
    static create = async (body) => {
        const {name} = body;
       let role=await Role.findOne({name});
        if(!role){
            role=await Role.create({name});
        }
        return role
    };


    static getAll = async () => {
        let data;
        data = await Role.find();
        return data;
    };

    static findById = async (roleId) => {
        let data;
        data = await Role.findById(roleId);
        return data;
    };

    static updateRole = async (role) => {
        let updatedRole;
        updatedRole = await Role.findByIdAndUpdate(role._id,role,{new:true});
        return updatedRole;
    };

    static deleteRole = async (roleId) => {
        let updatedRole;
        updatedRole = await Role.findByIdAndDelete(roleId);
        return updatedRole;
    };
}
