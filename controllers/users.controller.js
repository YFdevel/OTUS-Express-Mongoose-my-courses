import express from "express";
import {create, login, getAll, findById, updateUser, deleteUser} from "../services/users.service.js";
import {checkAccess} from "../utils/check-access.js"
import {tryCatch} from "../utils/tryCatch.js";
import {generateAccessToken} from "../utils/generateAccessToken.js";

const userRouter = express.Router();

userRouter.post("/",
    tryCatch(async (req, res) => {
        const answerFromService = await create(req.body);
        if (answerFromService === null) {
            res.status(400).json({message: "Пользователь с таким именем уже существует"});

        } else {
            res.status(201).json(answerFromService);
        }
    }));

userRouter.post("/login", tryCatch(async (req, res) => {
    const answerFromServer = await login(req.body);
    if (answerFromServer === null) {
        res.cookie('messageAuth', "Пользователя с такими данными не существует", {maxAge: 1000 * 60 * 120});
        res.cookie('codeAuth', "400", {maxAge: 1000 * 60 * 120});
        res.status(400).json({message: "Пользователя с такими данными не существует"});

    } else {
        const token = generateAccessToken(answerFromServer._id, answerFromServer.roles);
        res.cookie('token', token, {maxAge: 1000 * 60 * 120});
        res.cookie('messageAuth', "Вы успешно авторизовались", {maxAge: 1000 * 60 * 120});
        res.cookie('codeAuth', "200", {maxAge: 1000 * 60 * 120});
        res.status(200).json({token});
    }
}));

userRouter.get("/", tryCatch(async (req, res) => {
    res.render("authorization", {
        isAuth: true
    })
}));


userRouter.get("/all", checkAccess("USER"), tryCatch(async (req, res) => {
    const data = await getAll();
    await res.json(data);
}));

userRouter.get("/fail", tryCatch(async (req, res) => {
    res.render("fail-page", {
        code: req.cookies.codeAuth,
        message: req.cookies.messageAuth
    });
}));

userRouter.get("/success", tryCatch(async (req, res) => {
    res.render("success", {
        code: req.cookies.codeAuth,
        message: req.cookies.messageAuth
    });
}));

userRouter.get("/:id", tryCatch(async (req, res) => {
    const {id} = req.params;
    const data = await findById(id);
    await res.json(data);
}));


userRouter.patch("/", tryCatch(async (req, res) => {
    const user = req.body;
    if (!user._id) {
        res.status(400).json({message: "Не указан id"});
    }
    const data = await updateUser(user);
    await res.json(data);
}));


userRouter.delete("/:id", tryCatch(async (req, res) => {
    const {id} = req.params;
    const data = await deleteUser(id);
    await res.json(data);
}));

export default userRouter;