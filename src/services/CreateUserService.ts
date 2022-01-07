import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

type UserRequest = {
    nome: string;
    telefone: string;
}


export class CreateUserService {
    async execute({ nome, telefone }:UserRequest): Promise<User> {
        const repo = getRepository(User);

        if (await repo.findOne({ nome })) {
            return new Error('User already exists');
        }

        const user = repo.create({
            nome,
            telefone
        })

        await repo.save(user);

        return user;
    }
}