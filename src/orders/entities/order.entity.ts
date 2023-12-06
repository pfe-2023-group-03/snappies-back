import { orderState } from "src/enums/orderState.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { Deliverer } from "../../deliverer/entities/deliverer.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    number: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: "clientId" })
    clientId: Client;

    @ManyToOne(() => Deliverer)
    @JoinColumn({ name: "delivererId" })
    delivererId: Deliverer;

    @Column({ nullable: false })
    state: orderState;
}