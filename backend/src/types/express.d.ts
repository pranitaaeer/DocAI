import { Document } from "mongoose";
import { IUser } from "../models/user.models.ts";

declare global {
  namespace Express {
    interface Request {
      user?: Document | any; 
    }
  }
}
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: Document | any;
      file?: Express.Multer.File;
      files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
    }
  }
}