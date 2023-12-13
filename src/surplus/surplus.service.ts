import { Injectable } from '@nestjs/common';
import { CreateSurplusDto } from './dto/create-surplus.dto';
import { UpdateSurplusDto } from './dto/update-surplus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Surplus } from './entities/surplus.entity';

@Injectable()
export class SurplusService {

  constructor(
    @InjectRepository(Surplus)
    private surplusRepository : Repository<Surplus>
) {}

  create(createSurplusDto: CreateSurplusDto) {
    return this.surplusRepository.save(createSurplusDto);
  }

  findAll() {
    return this.surplusRepository.find();
  }

  findOne(deliveryId: number, articleId: number) {
    return this.surplusRepository.findOne({
      where: { deliveryId, articleId },
  });
  }

  update(deliveryId: number, articleId: number, updateSurplusDto: UpdateSurplusDto) {
    return this.surplusRepository.update({ deliveryId, articleId }, updateSurplusDto);
  }

  remove(deliveryId: number, articleId: number) {
    return this.surplusRepository.delete({ deliveryId, articleId });
  }

  findByDelivery(deliveryId: number) {
    return this.surplusRepository.find({
      where: { deliveryId },
    });
  }
}
