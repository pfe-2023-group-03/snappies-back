import { ApiProperty } from "@nestjs/swagger";
import { orderState } from "src/enums/orderState.enum";
import { Client } from "../../client/entities/client.entity";
import { Delivery } from "../../deliveries/entities/delivery.entity";

export class CreateOrderDto {

    @ApiProperty()
    number: number;

    @ApiProperty()
    clientId: Client;

    @ApiProperty()
    deliveryId: Delivery;

    @ApiProperty()
    state: orderState;
}