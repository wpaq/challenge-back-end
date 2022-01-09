import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from "../models/User";

export class UserController {
    async show (req: Request, res: Response) {
        try {
            const repoUser = getRepository(User);
            const users = await repoUser.find();

            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { nome, telefone } = req.body;
            const repoUser = getRepository(User);

            if (telefone.length < 8) {
                return res.status(400).json({
                    error: 'Telefone field must have at least 8 characters '
                })
            }

            if (await repoUser.findOne({ nome })) {
                return res.status(400).json({
                    error: 'Users already exists'
                })
            }

            const user = repoUser.create({ nome, telefone })
            await repoUser.save(user);

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }        
    }

    async showChaves (req: Request, res: Response){
        try {
            const { id } = req.body;

            const repoUser = getRepository(User);

            if(!(await repoUser.findOne(id))) {
                return res.status(400).json({
                    error: 'Users does not exists'
                });
            }

            const userChaves = await repoUser.findOne({
                relations: ['chaves'],
                where: { id }
            });

            const chaves = userChaves?.chaves;
            
            return res.status(200).json(chaves);
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }
    }
}
