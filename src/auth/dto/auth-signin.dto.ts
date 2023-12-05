import { ApiProperty } from "@nestjs/swagger";

export class AuthSignInDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}