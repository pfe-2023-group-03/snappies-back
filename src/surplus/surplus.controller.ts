import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurplusService } from './surplus.service';
import { CreateSurplusDto } from './dto/create-surplus.dto';
import { UpdateSurplusDto } from './dto/update-surplus.dto';

@Controller('surplus')
export class SurplusController {
  constructor(private readonly surplusService: SurplusService) {}

  @Post()
  create(@Body() createSurplusDto: CreateSurplusDto) {
    return this.surplusService.create(createSurplusDto);
  }

  @Get()
  findAll() {
    return this.surplusService.findAll();
  }

  @Get(':deliveryId/:articleId')
  findOne(@Param('deliveryId') deliveryId: number, @Param('articleId') articleId: number) {
    return this.surplusService.findOne(+deliveryId,+articleId);
  }

  @Patch(':id')
  update(@Param('deliveryId') deliveryId: number, @Param('articleId') articleId: number, @Body() updateSurplusDto: UpdateSurplusDto) {
    return this.surplusService.update(+deliveryId,+articleId, updateSurplusDto);
  }

  @Delete(':id')
  remove(@Param('deliveryId') deliveryId: number, @Param('articleId') articleId: number) {
    return this.surplusService.remove(+deliveryId,+articleId);
  }

  @Get('delivery/:deliveryId')
  findByDelivery(@Param('deliveryId') deliveryId: number) {
    return this.surplusService.findByDelivery(+deliveryId);
  }
}
