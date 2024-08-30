import jwt from "jsonwebtoken"

export const signToken = (userId: string): string => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET as string, {
        expiresIn: 'id'
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}