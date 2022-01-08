import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import { Chave } from "../models/Chave";
import { User } from "../models/User";

export class ChaveController {
    async show (req: Request, res: Response) {
        try {
            const repoChave = getRepository(Chave);

            const chaves = await repoChave.find();

            return res.status(200).json(chaves);
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }
    }

    async store (req: Request, res: Response) {
        try {
            const { valor, user_id } = req.body;

            const repoChave = getRepository(Chave);
            const repoUser = getRepository(User);
    
            // SELECT * from users WHERE user_id='user_id';
            if (!(await repoUser.findOne(user_id))) {
                return res.status(400).json({
                    error: 'Users does not exists'
                });
            }
    
            // SELECT * from chaves WHERE user_id='user_id';
            const chaves = await repoChave.find({ where: { user_id: user_id } });
    
            // Verifica se o user já tem 3 chaves
            if (chaves.length === 3) {
                return res.status(400).json({
                    error: 'Maximum keys reached'
                });
            } 
    
            // SELECT * from chaves WHERE user_id='user_id' AND valor='valor';
            if (await repoChave.findOne({ where: { user_id: user_id, valor: valor } })) {
                return res.status(400).json({
                    error: 'Chave already exists'
                });
            }
    
            const chave = repoChave.create({ valor, user_id });
            await repoChave.save(chave);
    
            return res.status(200).json({
                message: 'Chave registered successfully '
            });
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }       
    }
}
