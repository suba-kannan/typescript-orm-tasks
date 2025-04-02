
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



