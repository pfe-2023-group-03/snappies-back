import { Body, Controller, Delete, Get, Param, Patch, Post  } from '@nestjs/common';
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
    @Public()
    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    // find one by id
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    // create order
    //@Roles(Role.Admin)
    @Public()
    @Post()
    create(@Body() createOrderDto:CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    // update order (change state) by id
    @Public()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrdertDto: UpdateOrdertDto) {
        return this.ordersService.update(+id, updateOrdertDto);
    }

    // delete order by id
    @Roles(Role.Admin)
    @Public()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }

}
