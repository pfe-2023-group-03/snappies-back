import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {

    @ApiProperty()
    number: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;
}