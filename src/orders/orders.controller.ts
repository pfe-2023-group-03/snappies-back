import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrdertDto } from './dto/update-order.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { ClientsService } from 'src/client/clients.service';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService, private readonly deliveriesService : DeliveriesService, private readonly clientsService : ClientsService) {}

    /**
     * Get all orders
     * 
     * @returns all orders and [] if no order
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Get()
    async findAll() {
        return await this.ordersService.findAll();
    }

    /**
     * Get one order by id
     * 
     * @param id the order id 
     * @returns the order
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 200: OK
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const order = await this.ordersService.findOne(+id);
        if(!order) throw new NotFoundException();

        return await this.ordersService.findOne(+id);
    }

    /**
     * Create a new order
     * 
     * @param createOrderDto the order to create 
     * @returns the created order
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 201: Created
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Post()
    async create(@Body() createOrderDto : CreateOrderDto) {
        if(!createOrderDto) throw new BadRequestException();

        const delivery = await this.deliveriesService.findOne(createOrderDto.deliveryId);
        if(!delivery) throw new BadRequestException();

        const client = await this.clientsService.findOne(createOrderDto.clientId);
        if(!client) throw new BadRequestException();

        return await this.ordersService.create(createOrderDto);
    }

    /**
     * Update an order
     * 
     * @param id the order id
     * @param updateOrdertDto the order to update
     * @returns the updated order
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 200: OK
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrdertDto: UpdateOrdertDto) {
        if(!updateOrdertDto) throw new BadRequestException();

        const order = await this.ordersService.findOne(+id);
        if(!order) throw new NotFoundException();

        return await this.ordersService.update(+id, updateOrdertDto);
    }

    /**
     * Delete an order
     * 
     * @param id the order id
     * @returns the deleted result
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 200: OK
     */
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const order = await this.ordersService.findOne(+id);
        if(!order) throw new NotFoundException();

        return await this.ordersService.remove(+id);
    }

    /**
     * Get all orders of a delivery
     * 
     * @param id the client id
     * @returns all orders of the delivery
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 200: OK
     * - 404: Not Found
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Get('delivery/:id')
    async getOrders(@Param('id') id: string) {
        const delivery = await this.deliveriesService.findOne(+id);
        if(!delivery) throw new NotFoundException();

        return await this.ordersService.getOrdersOfDelivery(+id);
    }
}
