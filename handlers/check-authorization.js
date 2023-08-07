import jwt from "jsonwebtoken";
import {secret} from "../jwt.config.js";

export function checkAuthorization(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.cookies.token ||req.headers?.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({message: "Пользователь не авторизован"});
            res.render('authorization',{
                isAuth:true
            });
        }
            const decodedToken = jwt.verify(token,secret);
            req.user=decodedToken;
            next();


    } catch (err) {
        console.log(err);
         // res.status(401).json({message: "Пользователь не авторизован"});
        res.render('authorization',{
            isAuth:true
        });
    }
}