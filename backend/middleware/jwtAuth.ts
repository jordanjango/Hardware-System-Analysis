import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "anshumann"; // Replace with your secret key or use environment variables

// Interface to extend the Request object with user data
interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

// JWT Authentication Middleware
export const jwtAuth:any = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({ message: "Authorization token missing or malformed" });
    }
    
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded payload to the request
        next(); // Pass control to the next middleware
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
