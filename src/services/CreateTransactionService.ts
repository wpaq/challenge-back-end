import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { Transaction } from '../entities/Transaction';

interface ITransactionRequest  {
    valor: string;
    user_send: string;
    user_receive: string;
}

export class CreateTransactionService {
    repoTransaction: Repository<Transaction>;
    repoUser: Repository<User>;


    async execute({ valor, user_send, user_receive }: ITransactionRequest) {
        const repo = getRepository(Transaction);
        const repoUser = getRepository(User);

        const transaction = repo.create({ valor, user_send, user_receive });
        await this.repoTransaction.save(transaction);

        return transaction;
    }

    async show() {
        const transactions = await this.repoTransaction.find();

        return transactions;
    }
}