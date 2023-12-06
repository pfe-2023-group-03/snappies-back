import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrdertDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

    constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>) {}

    // find all orders
    findAll() {
        return this.ordersRepository.find();
    }

    // find one order by id
    findOne(id: number) {
        return this.ordersRepository.findOne({
            where: {id}
        });
    }

    // create order
    async create(createOrderDto: CreateOrderDto){
        return this.ordersRepository.save(createOrderDto);
    }

    // update order (change state) by id
    update(id: number, updateOrdertDto: UpdateOrdertDto) {
        return this.ordersRepository.update(id, updateOrdertDto);
    }


    // delete order by id
    remove(id: number) {
        return this.ordersRepository.delete(id);
    }

    // get orders of a delivery
    getOrdersOfDelivery(id: number) {
        const orders = this.ordersRepository.find({
            where: {
                delivery: { id },
            },
        });

        return orders;
    }

}
