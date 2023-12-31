import { Module } from '@nestjs/common';
import { OrderDetailsController } from './order-details.controller';
import { OrderDetailsService } from './order-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entites/orderDetail.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ArticlesModule } from 'src/articles/articles.module';
import { SurplusModule } from 'src/surplus/surplus.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail]), OrdersModule, ArticlesModule, SurplusModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService]
})
export class OrderDetailsModule {}
