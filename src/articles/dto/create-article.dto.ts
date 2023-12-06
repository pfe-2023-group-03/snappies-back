import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
    
    @ApiProperty()
    label: string;
}