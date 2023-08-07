import jwt from "jsonwebtoken";
import {secret} from "../jwt.config.js";

export function checkRoles(roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                res.status(401).json({message: "Пользователь не авторизован"});
            }
            const {roles: userRoles} = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if(!hasRole){
                res.status(403).json({message: "Нет доступа"});
            }
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({message: "Пользователь не авторизован"});
        }
    }
}