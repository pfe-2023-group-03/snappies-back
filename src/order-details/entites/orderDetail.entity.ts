import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../../articles/entities/article.entity";
import { Order } from "../../orders/entities/order.entity";


@Entity()
export class OrderDetail {
    @PrimaryColumn()
    orderId: number;

    @PrimaryColumn()
    articleId: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    @JoinColumn({ name: 'orderId' })
    order: Order;
  
    @ManyToOne(() => Article, article => article.orderDetails)
    @JoinColumn({ name: 'articleId' })
    article: Article;

    @Column({nullable: false})
    defaultQuantity: number;

    @Column({nullable: false, default: 0})
    surplusQuantity: number;
}