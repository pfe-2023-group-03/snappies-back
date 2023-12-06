import { Injectable, NotFoundException } from '@nestjs/common';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';


@Injectable()
export class DeliveriesService {

    constructor(
        @InjectRepository(Delivery)
        private deliveryRepository : Repository<Delivery>,
    ) {}

    // find all deliveries
    findAll(){
        return this.deliveryRepository.find();
    }

    // find one delivery by id
    findOne(id: number){
        return this.deliveryRepository.findOne({
            where: { id },
        });
    }

    // create a delivery
    create(createDeliveryDto: CreateDeliveryDto){
        return this.deliveryRepository.save(createDeliveryDto);
    }

    // update a delivery
    update(id: number, updateDeliveryDto: UpdateDeliveryDto){
        return this.deliveryRepository.update(id, updateDeliveryDto);
    }

    // delete a delivery
    remove(id: number){
        return this.deliveryRepository.delete(id);
    }

}
