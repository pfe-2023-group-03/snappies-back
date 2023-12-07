import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {

    @ApiProperty()
    orderId: number;

    @ApiProperty()
    articleId: number;

    @ApiProperty()
    quantity: number;
}