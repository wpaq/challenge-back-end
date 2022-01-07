import { Request, Response } from "express";
import { CreateChaveService } from "../services/CreateChaveService";

export class CreateChaveController {
    async handle(request: Request, response: Response) {
        const { valor, user_id } = request.body;

        const service = new CreateChaveService();

        const result = await service.execute({ valor, user_id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}