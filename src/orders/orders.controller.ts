import { Body, Controller, Delete, Get, Param, Patch, Post  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrdertDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    //find all orders
    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    // find one by id
    @Get(':id')
    findOne(id: string) {
        return this.ordersService.findOne(+id);
    }

    // create order
    @Post()
    create(@Body() createOrderDto:CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    // update order (change state) by id
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrdertDto: UpdateOrdertDto) {
        return this.ordersService.update(+id, updateOrdertDto);
    }

    // delete order by id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }

}
