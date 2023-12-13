import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDetailDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    articleId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    surplusQuantity: number;
}