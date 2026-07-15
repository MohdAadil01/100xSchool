// src/types/express.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
      propertyId: string | null;
    };
  }
}

// declare namespace Express {
//   interface Request {
//     user?: {
//       id: string;
//       role: string;
//       propertyId: string | null;
//     };
//   }
// }

// // declre merging
