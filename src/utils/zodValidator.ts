import { ZodSchema,ZodError } from "zod";


export const validateDto =<T> (schema: ZodSchema<T>, data: unknown): T => {
    try{
        return schema.parse(data);
    } catch(error){
        if(error instanceof ZodError){
            throw new Error(error.errors.map(e => e.message).join(','));

        }
        throw new Error("Validation Failed");
    }
};