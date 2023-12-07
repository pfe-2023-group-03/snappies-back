import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entites/orderDetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {

    constructor(
        @InjectRepository(OrderDetail)
        private articleRepository : Repository<OrderDetail>
    ) {}

    // get all orderDetails
    findAll() {
        return this.articleRepository.find();
    }

    // get one orderDetail by id
    findOne(orderId: number, articleId: number) {
        return this.articleRepository.findOne({
            where: { orderId, articleId }
        });
    }

    // add orderDetail to order
    create(: ) {
        return this.articleRepository.save(orderDetail);
    }



}
