import { Module } from '@nestjs/common';
import { NurseriesService } from './nurseries.service';
import { NurseriesController } from './nurseries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nursery } from './entities/nursery.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Nursery])],
    providers: [NurseriesService],
    controllers: [NurseriesController]
})
export class NurseriesModule {}
