import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
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

  /**
   * Create a new surplus
   * 
   * @param createSurplusDto 
   * @returns the created surplus
   * - 201: Created
   * - 400: Bad Request
   * - 401: Unauthorized
   * - 403: Forbidden
   */
  @Roles(Role.Deliverer,Role.Admin)
  @Post()
  async create(@Body() createSurplusDto: CreateSurplusDto) {
    if (!createSurplusDto) throw new BadRequestException();
    return await this.surplusService.create(createSurplusDto);
  }

  /**
   * Get all surpluses
   * 
   * @returns surpluses and [] if empty
   * - 200: OK
   * - 401: Unauthorized
   * - 403: Forbidden
   */
  @Roles(Role.Deliverer,Role.Admin)
  @Get()
  async findAll() {
    return await this.surplusService.findAll();
  }

  /**
   * Get one surplus by deliveryId and articleId
   * 
   * @param deliveryId the delivery id
   * @param articleId the article id
   * @returns the surplus
   * - 200: OK
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 404: Not found
   */
  @Roles(Role.Deliverer,Role.Admin)
  @Get(':deliveryId/:articleId')
  async findOne(@Param('deliveryId') deliveryId: string, @Param('articleId') articleId: string) {
    const surplus = await this.surplusService.findOne(+deliveryId,+articleId);
    if (!surplus) throw new NotFoundException();

    return surplus;
  }

  /**
   * Update a surplus
   * 
   * @param deliveryId the delivery id
   * @param articleId the article id
   * @param updateSurplusDto the surplus to update
   * @returns the updated surplus
   * - 200: OK
   * - 400: Bad Request
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 404: Not found
   */
  @Roles(Role.Deliverer,Role.Admin)
  @Patch(':deliveryId/:articleId')
  async update(@Param('deliveryId') deliveryId: string, @Param('articleId') articleId: string, @Body() updateSurplusDto: UpdateSurplusDto) {
    if (!updateSurplusDto) throw new BadRequestException();

    const surplus = await this.surplusService.findOne(+deliveryId,+articleId);
    if (!surplus) throw new NotFoundException();

    return await this.surplusService.update(+deliveryId,+articleId, updateSurplusDto);
  }

  /**
   * Delete a surplus
   * 
   * @param deliveryId the delivery id
   * @param articleId the article id
   * @returns the deleted surplus
   * - 200: OK
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 404: Not found
   */
  @Roles(Role.Deliverer,Role.Admin)
  @Delete(':deliveryId/:articleId')
  async remove(@Param('deliveryId') deliveryId: string, @Param('articleId') articleId: string) {
    const surplus = await this.surplusService.findOne(+deliveryId,+articleId);
    if (!surplus) throw new NotFoundException();

    return await this.surplusService.remove(+deliveryId,+articleId);
  }

  /**
   * Find all surpluses by delivery id
   * 
   * @param deliveryId the delivery id
   * @returns the surpluses
   * - 200: OK
   * - 401: Unauthorized
   * - 403: Forbidden
   */
  @Roles(Role.Deliverer, Role.Admin)
  @Post('delivery/:deliveryId')
  findByDelivery(@Param('deliveryId') deliveryId: string) {
    const delivery = this.surplusService.findByDelivery(+deliveryId);
    if (!delivery) throw new NotFoundException();

    return delivery;
  }
}
