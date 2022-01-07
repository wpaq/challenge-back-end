import { Request, Response } from 'express';
import { GetAllChavesService } from '../services/GetAllChavesService';

export class GetAllChavesController {
    async handle (req: Request, res: Response) {
        const service = new GetAllChavesService();

        const chaves = await service.execute();

        return res.json(chaves);
    }


};
