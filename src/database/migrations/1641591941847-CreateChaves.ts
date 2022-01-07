import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateChaves1641591941847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'chaves',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'valor',
                        type: 'varchar'
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        width: 3
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
                        name: 'fk_chaves_user',
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('chaves');
    }

}

