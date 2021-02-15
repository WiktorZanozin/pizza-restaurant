import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { PizzaStatus } from "./pizza-status.enum";

@Entity()
export class Pizza extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;

    @Column()
    description:string;

    @Column()
    priceForSmall: number;

    @Column()
    priceForMedium: number;

    @Column()
    priceForLarge: number;
    
    @Column()
    status: PizzaStatus;
}