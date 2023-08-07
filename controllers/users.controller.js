import express from "express";
import {UsersService} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import {secret} from "../jwt.config.js";
import {checkRoles} from "../handlers/check-roles.js"

const userRouter = express.Router();


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, {expiresIn: '15m'});
};

userRouter.post("/",
    async (req, res) => {
        console.log(req.body);
        try {
            const answerFromService = await UsersService.create(req.body);
            if (answerFromService === null) {
                res.status(400).json({message: "Пользователь с таким именем уже существует"});

            } else {
                res.status(201).json(answerFromService);
            }

        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Registration error"});
        }
    });

userRouter.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const answerFromServer = await UsersService.login(req.body);
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

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Authorization error"});
    }
});

userRouter.get("/", async (req, res) => {
    res.render("authorization", {
        isAuth: true
    })
});


userRouter.get("/all", checkRoles('USER'), async (req, res) => {
    try {
        const data = await UsersService.getAll();
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }

});

userRouter.get("/fail", async (req, res) => {
    res.render("fail-page", {
        code: req.cookies.codeAuth,
        message: req.cookies.messageAuth
    });
});

userRouter.get("/success", async (req, res) => {
    res.render("success", {
        code: req.cookies.codeAuth,
        message: req.cookies.messageAuth
    });
});

userRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: "Не указан id"});
        }
        const data = await UsersService.findById(id);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


userRouter.patch("/", async (req, res) => {
    try {
        const user = req.body;
        if (!user._id) {
            res.status(400).json({message: "Не указан id"});
        }
        const data = await UsersService.updateUser(user);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


userRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: "Не указан id"});
        }
        const data = await UsersService.deleteUser(id);
        await res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default userRouter;