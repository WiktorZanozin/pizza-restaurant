import { BaseEntity, Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userName: string;

    @Column()
    password: string;
}
