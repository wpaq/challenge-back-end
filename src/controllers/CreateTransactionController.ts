import { Request, Response } from "express";
import { CreateTransactionService } from "../services/CreateTransactionService";

export class CreateTransactionController {
    async handle(request: Request, response: Response) {
        const { valor, user_send, user_receive } = request.body;

        const service = new CreateTransactionService();

        const result = await service.execute({ valor, user_send, user_receive });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async show (request: Request, response: Response) {
        
    }
}