// import type { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken"

// export function authMiddleware(req: Request, res: Response, next: NextFunction) {

//     const authHeader = req.headers["authorization"]
//     const token = authHeader?.split(" ")[1]

//     if (!token) {
//          res.status(403).json({ message: "Unauthorized - No token provided" });
//             return
//     }
//     try{
//         const decoded = jwt.decode(token, process.env.AUTH_JWT_KEY as string, {
//             algorithms: ['RS256'],
//           })
//         console.log(decoded)
//         if(decoded?.sub) {
//             next()
//             req.userId = decoded?.sub
//         }
        
//     } catch (err) {
//         res.status(403).json({ 
//             message: "Unauthorized" 
//         })
       
//     }
// }
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Unauthorized - No token provided" });
    return; // ✅ important!
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_JWT_KEY as string, {
      algorithms: ["RS256"],
    }) as jwt.JwtPayload;

    if (!decoded || !decoded.sub) {
      res.status(403).json({ message: "Unauthorized - Invalid token" });
      return; // ✅ important!
    }

    req.userId = decoded.sub;
    next(); // ✅ proceed
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(403).json({ message: "Unauthorized - Token verification failed" });
    return; // ✅ important!
  }
}
