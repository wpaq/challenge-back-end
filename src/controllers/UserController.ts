import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from "../entities/User";

export class UserController {
    async show (req: Request, res: Response) {
        try {
            const repoUser = getRepository(User);
            const users = await repoUser.find();

            return res.json(users);
        } catch (err) {
            return res.status(400).json(err)
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { nome, telefone } = req.body;
            const repoUser = getRepository(User);

            if (await repoUser.findOne({ nome })) {
                return res.status(400).json({
                    error: 'Users already exists'
                })
            }

            const user = repoUser.create({ nome, telefone })
            await repoUser.save(user);

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json(err)
        }        
    }
}
