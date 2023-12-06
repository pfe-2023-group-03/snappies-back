import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {

    constructor(
        @InjectRepository(Client)
        private clientRepository : Repository<Client>,
    ) {}

    // find all clients
    findAll() {
        return this.clientRepository.find();
    }

    // find one by id
    findOne(id: number) {
        return this.clientRepository.findOne({
            where: { id },
        });
    }

    // create one
    create(createClientDto: CreateClientDto) {
        return this.clientRepository.save(createClientDto);
    }

    // update one by id
    update(id: number, updateClientDto: UpdateClientDto) {
        return this.clientRepository.update(id, updateClientDto);
    }

    // delete one by id
    remove(id: number) {
        return this.clientRepository.delete(id);
    }
}
