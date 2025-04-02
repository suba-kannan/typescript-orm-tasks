import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateAdminToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
     res.status(401).json({ message: 'Access denied. No token provided' });
     return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    const roles = req.user.role
    console.log('roles',roles)
    if(roles === "admin"){
      next();
    }else{
      res.status(401).send({message:"Access Denied"})
    }
    
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const authenticateUserToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
     res.status(401).json({ message: 'Access denied. No token provided' });
     return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

      next();
   
    
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

