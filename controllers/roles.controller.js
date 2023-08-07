import express from "express";
import {RolesService} from "../services/roles.service.js";

const rolesRouter = express.Router();
rolesRouter.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const answerFromService = await RolesService.create(req.body);
            res.status(201).json(answerFromService);
    } catch (err) {
        res.status(500).json(err);
    }
});


rolesRouter.get("/", async (req, res) => {
    try {
        const data = await RolesService.getAll();
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

rolesRouter.get("/:id", async (req, res) => {
    try {
        const {id}=req.params;
        if(!id){
            res.status(400).json({message:"Не указан id"});
        }
        const data = await RolesService.findById(id);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});
rolesRouter.patch("/", async (req, res) => {
    try {
        const role=req.body;
        if(!role._id){
            res.status(400).json({message:"Не указан id"});
        }
        const data = await RolesService.updateRole(role);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});
rolesRouter.delete("/:id", async (req, res) => {
    try {
        const {id}=req.params;
        if(!id){
            res.status(400).json({message:"Не указан id"});
        }
        const data = await RolesService.deleteRole(id);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default rolesRouter;