import jwt from "jsonwebtoken";

export function checkAccess(roles = null) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        if (!req.headers.authorization && !req.cookies.token) {
            // res.status(403).json({message:"Unauthorized"});
               res.redirect("/users")
         }
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (roles) {
            const hasRole = decodedToken?.roles.some(role => roles.includes(role));

            if (!hasRole) {
                res.status(403).json({message: "Нет доступа"});
            }
        }

        req.user = decodedToken;
        next();

    }
}