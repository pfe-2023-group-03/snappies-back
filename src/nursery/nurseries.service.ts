import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nursery } from './entities/nursery.entity';
import { CreateNurseryDto } from './dto/create-nursery.dto';
import { UpdateNurseryDto } from './dto/update-nursery.dto';

@Injectable()
export class NurseriesService {

    constructor(
        @InjectRepository(Nursery)
        private nurseryRepository : Repository<Nursery>,
    ) {}

    // find all nurseries
    findAll() {
        return this.nurseryRepository.find();
    }

    // find one by id
    findOne(id: number) {
        return this.nurseryRepository.findOne({
            where: { id },
        });
    }

    // create one
    create(createNurseryDto: CreateNurseryDto) {
        return this.nurseryRepository.save(createNurseryDto);
    }

    // update one by id
    update(id: number, updateNurseryDto: UpdateNurseryDto) {
        return this.nurseryRepository.update(id, updateNurseryDto);
    }

    // delete one by id
    remove(id: number) {
        return this.nurseryRepository.delete(id);
    }
}
