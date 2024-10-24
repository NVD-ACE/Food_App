import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const token = req.cookies.get('token');
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    // verify the token
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as jwt.JwtPayload;

    // check is decoding was successful
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
