import { PartialType } from "@nestjs/swagger";
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDetailDto } from "./create-orderDetail.dto";
import { IsNumber } from "class-validator";

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto){
    @ApiProperty()
    @IsNumber()
    surplusQuantity: number;
}