import { ApiProperty } from "@nestjs/swagger";

export class UserWithoutPassword {

    @ApiProperty()
    id: number;

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: string;
}