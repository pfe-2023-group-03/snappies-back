import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('deliveries')
export class DeliveriesController {

    constructor(private readonly deliveriesService : DeliveriesService) {}

    /**
     * Get all deliveries
     * 
     * @returns deliveries and [] if empty
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Get()
    async findAll() {
        return await this.deliveriesService.findAll();
    }

    /**
     * Get one delivery by id
     * 
     * @param id the delivery id
     * @returns the delivery
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not found
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const delivery = await this.deliveriesService.findOne(+id);
        if(!delivery) throw new NotFoundException();

        return delivery;
    }

    /**
     * Create a new delivery
     * 
     * @param createDeliveryDto the delivery to create 
     * @returns the created delivery
     * - 201: Created
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     */
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createDeliveryDto: CreateDeliveryDto) {
        if(!createDeliveryDto) throw new BadRequestException();
        return await this.deliveriesService.create(createDeliveryDto);
    }

    /**
     * Update a delivery
     * 
     * @param id the delivery id
     * @param updateDeliveryDto the delivery to update
     * @returns the updated delivery
     * - 200: OK
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     */
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
        if(!updateDeliveryDto) throw new BadRequestException();

        const delivery = await this.deliveriesService.findOne(+id);
        if(!delivery) throw new NotFoundException();

        return await this.deliveriesService.update(+id, updateDeliveryDto);
    }

    /**
     * Delete a delivery
     * 
     * @param id the delivery id 
     * @returns the deleted delivery
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     */
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const delivery = await this.deliveriesService.findOne(+id);
        if(!delivery) throw new NotFoundException();

        return await this.deliveriesService.remove(+id);
    }

}