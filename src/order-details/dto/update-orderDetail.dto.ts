import { PartialType } from "@nestjs/swagger";
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDetailDto } from "./create-orderDetail.dto";

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto){
    
    @ApiProperty()
    orderId: number;

    @ApiProperty()
    articleId: number;

    @ApiProperty()
    quantity: number;

}