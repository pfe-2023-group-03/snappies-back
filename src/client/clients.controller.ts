import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    // find all clients
    @Roles(Role.Admin)
    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    // find one by id
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id')
    findOne(id: string) {
        return this.clientsService.findOne(+id);
    }

    // create one
    @Roles(Role.Admin)
    @Post()
    create(@Body() createclientDto: CreateClientDto) {
        if(!createclientDto) throw new BadRequestException('Client required')
        return this.clientsService.create(createclientDto);
    }

    // update one by id
    @Roles(Role.Admin)
    @Patch(':id')
    update(id: string, @Body() updateClientDto: UpdateClientDto) {
        if(!updateClientDto) throw new BadRequestException('Client required')
        return this.clientsService.update(+id, updateClientDto);
    }

    // delete one by id
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }


}
