import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Article } from "../../articles/entities/article.entity";
import { Delivery } from "../../deliveries/entities/delivery.entity";


@Entity()
export class Surplus {

    @PrimaryColumn()
    deliveryId: number;

    @PrimaryColumn()
    articleId: number;

    @Column({nullable: false})
    quantity: number;

    @Column({nullable: false, default: 0})
    surplusQuantity: number;

    @ManyToOne(() => Delivery, delivery => delivery.surplus)
    @JoinColumn({ name: 'deliveryId' })
    delivery: Delivery;
  
    @ManyToOne(() => Article, article => article.surplus)
    @JoinColumn({ name: 'articleId' })
    article: Article;


}
