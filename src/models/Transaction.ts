import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('transactions')
export class Transaction {
    @PrimaryColumn()
    id: string;

    @Column()
    valor: string;

    @Column()
    user_send: string;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'user_send' })
    user_send_id: User;

    @Column()
    user_receive: string;
    
    @ManyToMany(() => User)
    @JoinColumn({ name: 'user_receive' })
    user_receive_id: User;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;   

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}