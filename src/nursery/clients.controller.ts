import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientyDto } from './dto/update-client.dto';

@Controller('nurseries')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    // find all nurseries
    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    // find one by id
     @Get(':id')
    findOne(id: number) {
        return this.clientsService.findOne(id);
    }

    // create one
    @Post()
    create(@Body() createclientDto: CreateClientDto) {
        return this.clientsService.create(createclientDto);
    }

    // update one by id
    @Patch(':id')
    update(id: number, @Body() updateClientDto: UpdateClientyDto) {
        return this.clientsService.update(+id, updateClientDto);
    }

    // delete one by id
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.clientsService.remove(+id);
    }


}
