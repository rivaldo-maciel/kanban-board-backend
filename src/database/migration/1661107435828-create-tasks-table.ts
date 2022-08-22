import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createTasksTable1661107435828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'created_date',
                        type: 'date',
                        isGenerated: true,
                        isNullable: false
                    },
                    {
                        name: 'column_id',
                        type: 'int',
                        isNullable: false,
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                columnNames: ['column_id'],
                referencedTableName: 'columns',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('columns');
    }

}
