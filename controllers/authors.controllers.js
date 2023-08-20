import express from "express";
import {checkAccess} from "../utils/check-access.js";
import {findById} from "../services/users.service.js";
import {tryCatch} from "../utils/tryCatch.js";

const authorsRouter = express.Router();

authorsRouter.get("/",checkAccess(),async (req, res) => {
    const authorId = req.user.id
    const author = await findById(authorId);
    res.render("create-course", {
        isAuthor: true,
        authorId,
        author: `${author.lastName} ${author.firstName}`
    })
});


export default authorsRouter;