import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;
}