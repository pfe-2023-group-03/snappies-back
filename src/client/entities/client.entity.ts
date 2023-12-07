import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    number: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    address: string;

    @Column({nullable: false})
    phone: string;

    @OneToMany(() => Order, order => order.client)
    orders: Order[];
}