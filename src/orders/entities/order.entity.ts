import { orderState } from "src/enums/orderState.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { Delivery } from "../../deliveries/entities/delivery.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    number: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: "clientId" })
    clientId: Client;

    @ManyToOne(() => Delivery)
    @JoinColumn({ name: "deliveryId" })
    delivererId: Delivery;

    @Column({ nullable: false , default: orderState.Delivery})
    state: orderState;
}