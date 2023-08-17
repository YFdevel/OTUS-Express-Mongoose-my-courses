import jwt from "jsonwebtoken";

export const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '2h'});
};