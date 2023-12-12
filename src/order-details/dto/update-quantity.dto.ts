import { PartialType } from "@nestjs/swagger";
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDetailDto } from "./create-orderDetail.dto";

export class UpdateQuantityDto {

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    default: boolean;
}