import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  providers: [DeliveriesService],
  controllers: [DeliveriesController],
  exports: [DeliveriesService]
})
export class DeliveriesModule {}
