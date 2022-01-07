import { getRepository } from "typeorm";
import { Chave } from "../entities/Chave"; 

export class GetAllChavesService {
    async execute() {
        const repo = getRepository(Chave);

        const chaves = await repo.find({
            relations: ['user']
        });
        
        if (chaves.length === 3) {
            console.log('aaaa')
        } 
        return chaves;
    }
}