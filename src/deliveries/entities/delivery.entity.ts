import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryState } from "src/enums/deliveryState.enum";
import { User } from "src/users/entities/user.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class Delivery {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    userId: User;

    @Column({ nullable: false, default: DeliveryState.Preparation })
    state: DeliveryState;

    @Column({nullable: false})
    title: string;

    @OneToMany(() => Order, order => order.delivery)
    orders: Order[];
}