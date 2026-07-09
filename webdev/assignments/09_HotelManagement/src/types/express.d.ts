declare namespace Express {
  interface Request {
    user?: {
      id: string;
      role: string;
      propertyId: string | null;
    };
  }
}

// declre merging
