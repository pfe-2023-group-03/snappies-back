import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    // find all clients
    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    // find one by id
     @Get(':id')
    findOne(id: string) {
        return this.clientsService.findOne(+id);
    }

    // create one
    @Post()
    create(@Body() createclientDto: CreateClientDto) {
        return this.clientsService.create(createclientDto);
    }

    // update one by id
    @Patch(':id')
    update(id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.clientsService.update(+id, updateClientDto);
    }

    // delete one by id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }


}
