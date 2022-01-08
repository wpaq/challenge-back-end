import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1641648088570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'valor',
                        type: 'real'
                    },
                    {
                        name: 'user_send',
                        type: 'uuid',
                    },
                    {
                        name: 'user_receive',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_transactions_user_send',
                        columnNames: ['user_send'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id']
                    },
                    {
                        name: 'fk_transactions_user_receive',
                        columnNames: ['user_receive'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions');
    }

}
