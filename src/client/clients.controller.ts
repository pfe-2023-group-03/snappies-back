import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    /**
     * Get all clients
     * 
     * @returns all clients and [] if no client
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     */
    @Roles(Role.Admin)
    @Get()
    async findAll() {
        return await this.clientsService.findAll();
    }

    /**
     * Get one client by id
     * 
     * @param id client id
     * @returns the client
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not found
     */
    @Roles(Role.Deliverer, Role.Admin)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const client = await this.clientsService.findOne(+id);
        if(!client) throw new NotFoundException();

        return client;
    }

    /**
     * Create a client
     * 
     * @param createclientDto client to create 
     * @returns the created client
     * - 201: Created
     * - 400: Bad request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 409: Conflict
     */
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createclientDto: CreateClientDto) {
        if(!createclientDto) throw new BadRequestException();

        const client = await this.clientsService.findOneByName(createclientDto.name);
        if(client) throw new ConflictException();

        return await this.clientsService.create(createclientDto);
    }

    /**
     * Update a client
     * 
     * @param id client id
     * @param updateClientDto client to update 
     * @returns the updated client
     * - 200: OK
     * - 400: Bad request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not found
     */
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        if(!updateClientDto) throw new BadRequestException();

        const client = await this.clientsService.findOne(+id);
        if(!client) throw new NotFoundException();

        return await this.clientsService.update(+id, updateClientDto);
    }

    /**
     * Delete a client
     * 
     * @param id client id
     * @returns the deleted client
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not found
     */
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const client = await this.clientsService.findOne(+id);
        if(!client) throw new NotFoundException();

        return await this.clientsService.remove(+id);
    }
}
