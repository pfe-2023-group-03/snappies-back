import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    number: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    address: string;

    @Column({nullable: false})
    phone: string;
}