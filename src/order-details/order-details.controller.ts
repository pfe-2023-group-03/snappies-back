import { Controller } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';

@Controller('order-details')
export class OrderDetailsController {

    constructor(private orderDetailsService: OrderDetailsService){}


    // get all orderDetails
    findAll() {
        return this.orderDetailsService.findAll();
    }

    // get one orderDetail by id
    findOne(orderId: number, articleId: number) {
        return this.orderDetailsService.findOne(orderId, articleId);
    }

    // add orderDetail to order
    create( createOrderDetailDto : CreateOrderDetailDto ) {
        return this.orderDetailsService.create(createOrderDetailDto);
    }

    // update orderDetail
    update(orderId: number, articleId: number, updateOrderDetailDto : UpdateOrderDetailDto) {
        return this.orderDetailsService.update(orderId, articleId, updateOrderDetailDto);
    }

    // delete orderDetail
    remove(orderId: number, articleId: number) {
        return this.orderDetailsService.remove(orderId, articleId);
    }

    // get all orderDetails for an order
    findByOrder(orderId: number) {
        return this.orderDetailsService.findByOrder(orderId);
    }

    // get quantity of an article in an order
    getQuantityOfArticleOrder(orderId: number, articleId: number) {
        return this.orderDetailsService.getQuantityOfArticleOrder(orderId, articleId);
    }

    // get sum of all quantities of articles in an order
    getSumQuantityOrder(orderId: number) {
        return this.orderDetailsService.getSumQuantityOrder(orderId);
    }


}
