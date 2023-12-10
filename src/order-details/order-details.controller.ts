import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from 'src/orders/orders.service';
import { ArticlesService } from 'src/articles/articles.service';

@ApiBearerAuth()
@Controller('order-details')
export class OrderDetailsController {

    constructor(private orderDetailsService: OrderDetailsService, private readonly ordersService : OrdersService, private readonly articlesService : ArticlesService){}


    /**
     * Get all orderDetails
     * 
     * @returns all orderDetails and [] if no orderDetail
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Get()
    async findAll() {
        return await this.orderDetailsService.findAll();
    }

    /**
     * Get one orderDetail by articleId and orderId
     * 
     * @param orderId the order id
     * @param articleId the article id
     * @returns the orderDetail
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 400: Bad Request
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Get(':orderId/:articleId')
    async findOne(@Param('orderId') orderId: string, @Param('articleId') articleId: string) {
        if(!orderId || !articleId) throw new BadRequestException('Order required or article required');
        
        const order = await this.ordersService.findOne(+orderId);
        if(!order) throw new BadRequestException();

        const article = await this.articlesService.findOne(+articleId);
        if(!article) throw new BadRequestException();

        const orderDetail = await this.orderDetailsService.findOne(+orderId, +articleId);
        if(!orderDetail) throw new NotFoundException();

        return orderDetail;
    }

    /**
     * Create a new orderDetail
     * 
     * @param createOrderDetailDto the orderDetail to create 
     * @returns the created orderDetail
     * - 201: Created
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Post()
    async create(@Body() createOrderDetailDto : CreateOrderDetailDto ) {
        return await this.orderDetailsService.create(createOrderDetailDto);
    }

    /**
     * Update a orderDetail
     * 
     * @param orderId the order id
     * @param articleId the article id
     * @param updateOrderDetailDto the orderDetail to update
     * @returns the updated orderDetail
     * - 200: OK
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Patch(':orderId/:articleId')
    async update(@Param('orderId') orderId: string, @Param('articleId') articleId: string, @Body() updateOrderDetailDto : UpdateOrderDetailDto) {
        if(!orderId || !articleId) throw new BadRequestException();

        const order = await this.ordersService.findOne(+orderId);
        if(!order) throw new BadRequestException();

        const article = await this.articlesService.findOne(+articleId);
        if(!article) throw new BadRequestException();

        const orderDetail = await this.orderDetailsService.findOne(+orderId, +articleId);
        if(!orderDetail) throw new NotFoundException();

        return await this.orderDetailsService.update(+orderId, +articleId, updateOrderDetailDto);
    }

    /**
     * Delete a orderDetail
     * 
     * @param orderId the order id
     * @param articleId the article id
     * @returns the deleted orderDetail
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 400: Bad Request
     */
    @Roles(Role.Admin)
    @Delete(':orderId/:articleId')
    async remove(@Param('orderId') orderId: string, @Param('articleId') articleId: string) {
        if(!orderId || !articleId) throw new BadRequestException();

        const order = await this.ordersService.findOne(+orderId);
        if(!order) throw new BadRequestException();

        const article = await this.articlesService.findOne(+articleId);
        if(!article) throw new BadRequestException();

        const orderDetail = await this.orderDetailsService.findOne(+orderId, +articleId);
        if(!orderDetail) throw new NotFoundException();

        return await this.orderDetailsService.remove(+orderId, +articleId);
    }

    /**
     * Get all orderDetails by orderId
     * 
     * @param orderId the order id
     * @returns all orderDetails and [] if no orderDetail
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 400: Bad Request
     * - 404: Not Found
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Get(':orderId')
    async findByOrder(@Param('orderId') orderId: string) {
        if(!orderId) throw new BadRequestException();

        const order = await this.ordersService.findOne(+orderId);
        if(!order) throw new BadRequestException();

        return await this.orderDetailsService.findByOrder(+orderId);
    }

    /**
     * Get all orderDetails by articleId
     * 
     * @param orderId the order id
     * @param articleId the article id
     * @returns all orderDetails and [] if no orderDetail
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 400: Bad Request
     * - 404: Not Found
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Get('quantityOfArticleOrder/:orderId/:articleId')
    async getQuantityOfArticleOrder(@Param('orderId') orderId: string, @Param('articleId') articleId: string) {
        if(!orderId || !articleId) throw new BadRequestException();

        const order = await this.ordersService.findOne(+orderId);
        if(!order) throw new BadRequestException();

        const article = await this.articlesService.findOne(+articleId);
        if(!article) throw new BadRequestException();


        return await this.orderDetailsService.getQuantityOfArticleOrder(+orderId, +articleId);
    }

    /**
     * Get sum of quantity of order
     * 
     * @param orderId the order id
     * @param articleId the article id
     * @returns the sum of quantity of order
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 400: Bad Request
     * - 404: Not Found
     */
    @Roles(Role.Deliverer,Role.Admin)
    @Post('sumQuantityOfOrder/:orderId')
    async getSumQuantityOfOrder2(@Param('orderId') orderId: string) {
        if(!orderId) throw new BadRequestException();

        const order = await this.ordersService.findOne(+orderId);
        if(!order) throw new BadRequestException();

        return await this.orderDetailsService.getSumQuantityOfOrder(+orderId);
    }
}
