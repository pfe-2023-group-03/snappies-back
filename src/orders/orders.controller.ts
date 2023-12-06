import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrdertDto } from './dto/update-order.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    //find all orders
    @Roles(Role.Deliverer, Role.Admin)
    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    // find one by id
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    // create order
    @Roles(Role.Deliverer, Role.Admin)
    @Post()
    create(@Body() createOrderDto:CreateOrderDto) {
        if(!createOrderDto) throw new BadRequestException('Order required');
        return this.ordersService.create(createOrderDto);
    }

    // update order (change state) by id
    @Roles(Role.Deliverer, Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrdertDto: UpdateOrdertDto) {
        if(!updateOrdertDto) throw new BadRequestException('Order required');
        return this.ordersService.update(+id, updateOrdertDto);
    }

    // delete order by id
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }

    // get orders of a delivery
    @Roles(Role.Deliverer, Role.Admin)
    @Get('delivery/:id')
    getOrders(@Param('id') id: string) {
        return this.ordersService.getOrdersOfDelivery(+id);
    }

}
