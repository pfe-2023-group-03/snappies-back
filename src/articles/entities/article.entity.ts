import { OrderDetail } from "../../order-details/entites/orderDetail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Surplus } from "../../surplus/entities/surplus.entity";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    label: string;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.article)
    orderDetails: OrderDetail[];

    @OneToMany(() => Surplus, surplus => surplus.article)
    surplus: Surplus[];
}
