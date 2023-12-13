import { Module } from '@nestjs/common';
import { SurplusService } from './surplus.service';
import { SurplusController } from './surplus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Surplus } from './entities/surplus.entity';

@Module({
  controllers: [SurplusController],
  imports: [TypeOrmModule.forFeature([Surplus])],
  providers: [SurplusService],
})
export class SurplusModule {}
