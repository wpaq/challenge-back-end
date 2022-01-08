import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import { Transaction } from "../models/Transaction";
import { User } from "../models/User";

export class TransactionController {
    async show (req: Request, res: Response) {
        try {
            const repoTransaction = getRepository(Transaction);

            const transactions = await repoTransaction.find();
    
            return res.status(200).json(transactions);
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }
    }

    async store (req: Request, res: Response) {
        try {
            const { valor, user_send, user_receive } = req.body;

            const repoTransaction = getRepository(Transaction);
            const repoUser = getRepository(User);

            if (!(await repoUser.findOne(user_send))) {
                return res.status(400).json({
                    error: 'Users does not exists'
                });
            }
            if (!(await repoUser.findOne(user_receive))) {
                return res.status(400).json({
                    error: 'Users does not exists'
                });
            }

            const transaction = repoTransaction.create({ valor, user_send, user_receive });
            await repoTransaction.save(transaction);

            return res.status(200).json(transaction);
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }
    }
}