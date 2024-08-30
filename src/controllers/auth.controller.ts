import { Request,Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDto,LoginDto } from "../dtos/auth.dto";
import { validateDto } from "../utils/zodValidator";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data = validateDto(RegisterDto, req.body);
            const token = await authService.register(data.email, data.password);
            res.status(201).json({ token });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = validateDto(LoginDto, req.body);
            const token = await authService.login(data.email, data.password);
            res.status(200).json({ token });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

}