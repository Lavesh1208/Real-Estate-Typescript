import { Request, Response, NextFunction } from 'express';
import ExpressError from '../utils/ErrorHandler';
import { AnyZodObject } from 'zod';

const validateResource =
   (shcema: AnyZodObject) =>
   (req: Request, res: Response, next: NextFunction) => {
      try {
         shcema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
            files: req.files,
         });
         next();
      } catch (e: any) {
         const msg = e.errors.map((err: any) => err.message).join(', ');
         throw new ExpressError(msg, 400);
      }
   };

export default validateResource;
