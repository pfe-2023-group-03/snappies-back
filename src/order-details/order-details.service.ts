import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entites/orderDetail.entity';
import { Repository, getManager } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

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

    // update quantity of an article in an order
    updateQuantity(orderId: number, articleId: number, updateQuantityDto:UpdateQuantityDto) {
        if(updateQuantityDto.default){
            return this.orderDetailRepository.update({ orderId, articleId }, { defaultQuantity: updateQuantityDto.quantity });
        }
        return this.orderDetailRepository.update({ orderId, articleId }, { surplusQuantity: updateQuantityDto.quantity });
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
            select: ['defaultQuantity', 'surplusQuantity'],
            where: { orderId, articleId }
        });
    }

    // get sum of all quantities of articles in an order
    getSumQuantityOfOrder(orderId: number){
        const result = this.orderDetailRepository
          .createQueryBuilder('orderDetail')
          .select('SUM(orderDetail.defaultQuantity) + SUM(orderDetail.surplusQuantity)', 'sum')
          .where('orderDetail.orderId = :orderId', { orderId })
          .getRawOne();
    
        return result || 0;
    }
    
}
