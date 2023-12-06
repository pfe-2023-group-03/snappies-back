import { Injectable } from '@nestjs/common';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class DeliveriesService {

    constructor(
        @InjectRepository(Delivery)
        private deliveryRepository : Repository<Delivery>
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
    

    // update a delivery
    // delete a delivery

    // get number of box for a delivery


}
