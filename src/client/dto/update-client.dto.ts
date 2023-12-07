import { PartialType } from "@nestjs/swagger";
import { CreateClientDto } from "./create-client.dto";
import { ApiProperty } from '@nestjs/swagger';


export class UpdateClientDto extends PartialType(CreateClientDto) {

    @ApiProperty()
    number: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;
}