import { ApiProperty } from "@nestjs/swagger";
import { orderState } from "src/enums/orderState.enum";
import { Client } from "../../client/entities/client.entity";
import { Delivery } from "../../deliveries/entities/delivery.entity";

export class CreateOrderDto {

    @ApiProperty()
    number: string;

    @ApiProperty()
    state: orderState;

    @ApiProperty()
    clientId: number;

    @ApiProperty()
    deliveryId: number;
}