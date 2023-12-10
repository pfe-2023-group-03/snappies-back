import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 20)
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 20)
    lastname: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
}
