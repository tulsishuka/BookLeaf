//  import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";


// export interface AuthRequest extends Request {
//   user?: {
//     userId: string;
//     role: "author" | "admin";
//     authorId?: string;
//   };
// }

// interface JwtPayload {
//   userId: string;
//   role: "author" | "admin";
//   authorId?: string;
// }

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is missing in .env");
// }

// export const protect = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "Authorization token is required",
//       });
//     }

//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Invalid authorization format",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       JWT_SECRET
//     ) as JwtPayload;

//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// };

// export const requireRole = (
//   ...allowedRoles: ("author" | "admin")[]
// ) => {
//   return (
//     req: AuthRequest,
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (!req.user) {
//       return res.status(401).json({
//         message: "Not authenticated",
//       });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: "You do not have permission to access this resource",
//       });
//     }

//     next();
//   };
// };


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: "author" | "admin";
  authorId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "Authorization token is required",
      });
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Invalid authorization format",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Token is missing",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    req.user = {
      id: decoded.userId,
      userId: decoded.userId,
      role: decoded.role,
      authorId: decoded.authorId,
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const requireRole = (
  ...allowedRoles: ("author" | "admin")[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Not authenticated",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: "You do not have permission to access this resource",
      });
      return;
    }

    next();
  };
};
