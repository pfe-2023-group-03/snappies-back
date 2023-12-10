import { OrderDetail } from "../../order-details/entites/orderDetail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    label: string;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.article)
    orderDetails: OrderDetail[];
}
