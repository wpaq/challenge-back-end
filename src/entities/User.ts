import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Chave } from "./Chave";

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
};
