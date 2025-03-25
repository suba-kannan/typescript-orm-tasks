import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;

        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: 'Access forbidden: Unauthorized role' });
            return;
        }

        next();
    };
};
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// export const authenticateJWT = (req: Request, res: Response, next: NextFunction):void => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         res.status(401).json({ message: 'Access denied' });
//         return;
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         (req as any).user = decoded; // Attach user to request
//         next();
//     } catch (error) {
//         res.status(403).json({ message: 'Invalid token' });
//     }
// };

