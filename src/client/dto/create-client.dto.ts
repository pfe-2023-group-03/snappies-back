import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {

    @ApiProperty()
    number: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;
}