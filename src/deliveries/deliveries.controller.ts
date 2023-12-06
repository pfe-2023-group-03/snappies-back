import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('deliveries')
export class DeliveriesController {

    constructor(private readonly deliveriesService : DeliveriesService) {}

    // find all deliveries
    @Roles(Role.Deliverer, Role.Admin)
    @Get()
    findAll() {
        return this.deliveriesService.findAll();
    }

    // find one delivery by id
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.deliveriesService.findOne(+id);
    }

    // create a delivery
    @Roles(Role.Admin)
    @Post()
    create(@Body() createDeliveryDto: CreateDeliveryDto) {
        return this.deliveriesService.create(createDeliveryDto);
    }

    // update a delivery
    @Roles(Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
        return this.deliveriesService.update(+id, updateDeliveryDto);
    }

    // delete a delivery
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deliveriesService.remove(+id);
    }


    // get number of box for a delivery
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id/box')
    getNumberOfBox(@Param('id') id: string) {
        return this.deliveriesService.getNumberOfBox(+id);
    }
}