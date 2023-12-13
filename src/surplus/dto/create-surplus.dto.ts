import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSurplusDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    deliveryId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    quantity: number;

}
