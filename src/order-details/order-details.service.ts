import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entites/orderDetail.entity';
import { Repository, getManager } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';

@Injectable()
export class OrderDetailsService {

    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository : Repository<OrderDetail>
    ) {}

    // get all orderDetails
    findAll() {
        return this.orderDetailRepository.find();
    }

    // get one orderDetail by id
    findOne(orderId: number, articleId: number) {
        return this.orderDetailRepository.findOne({
            where: { orderId, articleId }
        });
    }

    // add orderDetail to order
    create( createOrderDetailDto: CreateOrderDetailDto ) {
        return this.orderDetailRepository.save(createOrderDetailDto);
    }

    // update orderDetail
    update(orderId: number, articleId: number, updateOrderDetailDto: UpdateOrderDetailDto) {
        return this.orderDetailRepository.update({ orderId, articleId }, updateOrderDetailDto);
    }

    // delete orderDetail
    remove(orderId: number, articleId: number) {
        return this.orderDetailRepository.delete({ orderId, articleId });
    }

    // get all orderDetails for an order
    findByOrder(orderId: number) {
        return this.orderDetailRepository.find({
            where: { orderId }
        });
    }

    // get quantity of an article in an order
    getQuantityOfArticleOrder(orderId: number, articleId: number) {
        return this.orderDetailRepository.findOne({
            select: ['quantity'],
            where: { orderId, articleId }
        });
    }

    // get sum of all quantities of articles in an order
    async getSumQuantityOrder(orderId: number): Promise<number> {
        const result = await getManager()
          .createQueryBuilder()
          .select('SUM(quantity)', 'sum')
          .from(OrderDetail, 'orderDetail')
          .where('orderDetail.orderId = :orderId', { orderId })
          .getRawOne();
    
        return result.sum || 0;
      }
    
}
