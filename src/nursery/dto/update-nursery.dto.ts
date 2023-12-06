import { PartialType } from "@nestjs/swagger";
import { CreateNurseryDto } from "./create-nursery.dto";
import { ApiProperty } from '@nestjs/swagger';


export class UpdateNurseryDto extends PartialType(CreateNurseryDto) {

    @ApiProperty()
    number: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;
}