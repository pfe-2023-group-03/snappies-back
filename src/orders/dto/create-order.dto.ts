import { ApiProperty } from "@nestjs/swagger";
import { orderState } from "src/enums/orderState.enum";

export class CreateOrderDto {

    @ApiProperty()
    state: orderState;

    @ApiProperty()
    clientId: number;

    @ApiProperty()
    deliveryId: number;
}