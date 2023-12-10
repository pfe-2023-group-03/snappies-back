import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { ClientsModule } from 'src/client/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), DeliveriesModule, ClientsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
