import express from "express";
import {create,getAll,findById,updateRole,deleteRole} from "../services/roles.service.js";
import {tryCatch} from "../utils/tryCatch.js";

const rolesRouter = express.Router();
rolesRouter.post("/", tryCatch(async (req, res) => {
        const answerFromService = await create(req.body);
            res.status(201).json(answerFromService);
}));


rolesRouter.get("/", tryCatch(async (req, res) => {
        const data = await getAll();
        await res.json(data);
}));

rolesRouter.get("/:id", tryCatch(async (req, res) => {
        const {id}=req.params;
        const data = await findById(id);
        await res.json(data);
}));

rolesRouter.patch("/", tryCatch(async (req, res) => {
        const role=req.body;
        if(!role._id){
            res.status(400).json({message:"Не указан id"});
        }
        const data = await updateRole(role);
        await res.json(data);
}));

rolesRouter.delete("/:id", tryCatch(async (req, res) => {
        const {id}=req.params;
        const data = await deleteRole(id);
        await res.json(data);
}));

export default rolesRouter;