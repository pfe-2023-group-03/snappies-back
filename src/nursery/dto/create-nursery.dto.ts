import { ApiProperty } from "@nestjs/swagger";

export class CreateNurseryDto {

    @ApiProperty()
    number: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;
}