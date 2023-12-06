import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NurseriesService } from './nurseries.service';
import { CreateNurseryDto } from './dto/create-nursery.dto';

@Controller('nurseries')
export class NurseriesController {
    constructor(private readonly nurseriesService: NurseriesService) {}

    // find all nurseries
    @Get()
    findAll() {
        return this.nurseriesService.findAll();
    }

    // find one by id
     @Get(':id')
    findOne(id: number) {
        return this.nurseriesService.findOne(id);
    }

    // create one
    @Post()
    create(@Body() createNurseryDto: CreateNurseryDto) {
        return this.nurseriesService.create(createNurseryDto);
    }

    // update one by id
    @Patch(':id')
    update(id: number, @Body() updateNurseryDto: CreateNurseryDto) {
        return this.nurseriesService.update(+id, updateNurseryDto);
    }

    // delete one by id
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.nurseriesService.remove(+id);
    }


}
