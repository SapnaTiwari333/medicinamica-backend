import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";

export const protect = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
 // // Get the Authorization header from the request
  const authHeader = req.headers.authorization;


  // // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("No token provided");
  }


  /// Extract token from the "Bearer <token>" format`
  const token = authHeader.split(" ")[1];

  try {
    //// Verify the token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

     // Attach decoded user info to the request object so next middleware/controller can use it
    (req as any).user = decoded;

     // Proceed to the next middleware or controller
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token");
  }
});