import { orderState } from "src/enums/orderState.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { Delivery } from "../../deliveries/entities/delivery.entity";
import { OrderDetail } from "../../order-details/entites/orderDetail.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    number: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: "clientId" })
    client: Client;

    @ManyToOne(() => Delivery)
    @JoinColumn({ name: "deliveryId" })
    delivery: Delivery;

    @Column({ nullable: false , default: orderState.Delivery})
    state: orderState;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];
}