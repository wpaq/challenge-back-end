import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { Chave } from "../entities/Chave";

type ChaveRequest = {
  valor: string;
  user_id: string;
};

export class CreateChaveService {
  async execute({ valor, user_id }: ChaveRequest): Promise<Error | Chave> {
    const repo = getRepository(Chave);
    const repoUser = getRepository(User);

    // Verifica se o user existe
    if (!(await repoUser.findOne(user_id))) {
      return new Error("User dos not exists!");
    }

    // Verifica as chaves no banco
    const chaves = await repo.find({ where: { user_id: user_id } });

    // Se existir 3 chaves cadastradas return Error
    if (chaves.length === 3) {
      return new Error("Maximum keys reached!");
    } else {
      const chave = repo.create({ valor, user_id });
      await repo.save(chave);

      return chave;
    }
  }
}
