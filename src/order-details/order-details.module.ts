import { Module } from '@nestjs/common';
import { OrderDetailsController } from './order-details.controller';
import { OrderDetailsService } from './order-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entites/orderDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService]
})
export class OrderDetailsModule {}
