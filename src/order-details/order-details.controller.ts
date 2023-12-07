import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('order-details')
export class OrderDetailsController {

    constructor(private orderDetailsService: OrderDetailsService){}


    // get all orderDetails
    @Roles(Role.Deliverer,Role.Admin)
    @Get()
    findAll() {
        return this.orderDetailsService.findAll();
    }

    // get one orderDetail by id
    @Roles(Role.Deliverer,Role.Admin)
    @Get(':orderId/:articleId')
    findOne(@Param('orderId') orderId: number, @Param('articleId') articleId: number) {
        return this.orderDetailsService.findOne(orderId, articleId);
    }

    // add orderDetail to order
    @Roles(Role.Deliverer,Role.Admin)
    @Post()
    create(@Body() createOrderDetailDto : CreateOrderDetailDto ) {
        return this.orderDetailsService.create(createOrderDetailDto);
    }

    // update orderDetail
    @Roles(Role.Deliverer,Role.Admin)
    @Patch(':orderId/:articleId')
    update(@Param('orderId') orderId: number, @Param('articleId') articleId: number, @Body() updateOrderDetailDto : UpdateOrderDetailDto) {
        return this.orderDetailsService.update(orderId, articleId, updateOrderDetailDto);
    }

    // delete orderDetail
    @Roles(Role.Admin)
    @Delete(':orderId/:articleId')
    remove(@Param('orderId') orderId: number, @Param('articleId') articleId: number) {
        return this.orderDetailsService.remove(orderId, articleId);
    }

    // get all orderDetails for an order
    @Get(':orderId')
    findByOrder(@Param('orderId') orderId: number) {
        return this.orderDetailsService.findByOrder(orderId);
    }

    // get quantity of an article in an order
    @Roles(Role.Deliverer,Role.Admin)
    @Get('quantityOfArticleOrder/:orderId/:articleId')
    getQuantityOfArticleOrder(@Param('orderId') orderId: number, @Param('articleId') articleId: number) {
        return this.orderDetailsService.getQuantityOfArticleOrder(orderId, articleId);
    }

    // get sum of all quantities of articles in an order
    @Roles(Role.Deliverer,Role.Admin)
    @Get('sumQuantityOrder/:orderId')
    getSumQuantityOrder(@Param('orderId') orderId: number) {
        return this.orderDetailsService.getSumQuantityOrder(orderId);
    }


}
