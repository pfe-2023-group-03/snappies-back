import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurplusService } from './surplus.service';
import { CreateSurplusDto } from './dto/create-surplus.dto';
import { UpdateSurplusDto } from './dto/update-surplus.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('surplus')
export class SurplusController {
  constructor(private readonly surplusService: SurplusService) {}

  @Roles(Role.Deliverer,Role.Admin)
  @Post()
  create(@Body() createSurplusDto: CreateSurplusDto) {
    return this.surplusService.create(createSurplusDto);
  }

  @Roles(Role.Deliverer,Role.Admin)
  @Get()
  findAll() {
    return this.surplusService.findAll();
  }

  @Roles(Role.Deliverer,Role.Admin)
  @Get(':deliveryId/:articleId')
  findOne(@Param('deliveryId') deliveryId: number, @Param('articleId') articleId: number) {
    return this.surplusService.findOne(+deliveryId,+articleId);
  }

  @Roles(Role.Deliverer,Role.Admin)
  @Patch(':deliveryId/:articleId')
  update(@Param('deliveryId') deliveryId: number, @Param('articleId') articleId: number, @Body() updateSurplusDto: UpdateSurplusDto) {
    return this.surplusService.update(+deliveryId,+articleId, updateSurplusDto);
  }

  @Roles(Role.Deliverer,Role.Admin)
  @Delete(':deliveryId/:articleId')
  remove(@Param('deliveryId') deliveryId: number, @Param('articleId') articleId: number) {
    return this.surplusService.remove(+deliveryId,+articleId);
  }

  @Roles(Role.Deliverer, Role.Admin)
  @Post('delivery/:deliveryId')
  findByDelivery(@Param('deliveryId') deliveryId: number) {
    return this.surplusService.findByDelivery(+deliveryId);
  }
}
