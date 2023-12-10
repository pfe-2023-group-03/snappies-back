import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { orderState } from "src/enums/orderState.enum";

export class CreateOrderDto {

    @ApiProperty()
    @IsIn([orderState.Delivery, orderState.Done, orderState.Surplus])
    state: orderState;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    clientId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    deliveryId: number;
}