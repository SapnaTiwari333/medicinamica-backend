import {Request,Response,NextFunction} from "express";
import expressAsyncHandler from "express-async-handler";

import admin from "../config/firebase";

//Middleware to authentication Firebase Token from request headers
export const authenticateFirebaseToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction)=>{

    //Get the "Authorization" header from the request
    const authHeader=req.headers.authorization;

    //if the header is missing or doesn't start with Bearer,return unauthorized
    if(!authHeader || !authHeader.startsWith("Bearer")){
       res.status(401);
       throw new Error("No token provided");
    }
            
    //Extract the token from the authentication header
    const Token=authHeader.split(" ")[1];

    //verify token with Firebase admin SDK
    const decodedToken=await admin.auth().verifyIdToken(Token);

    //Attach decoded user to request object
    (req as any).user=decodedToken;

    //Proceed to next middleware or controller
    next();

}
);

//export default authenticateFirebaseToken;