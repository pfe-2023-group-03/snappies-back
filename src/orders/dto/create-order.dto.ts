import { ApiProperty } from "@nestjs/swagger";
import { orderState } from "src/enums/orderState.enum";
import { Client } from "../../client/entities/client.entity";
import { Deliverer } from "../../deliverer/entities/deliverer.entity";

export class CreateOrderDto {

    @ApiProperty()
    number: number;

    @ApiProperty()
    clientId: Client;

    @ApiProperty()
    delivererId: Deliverer;

    @ApiProperty()
    state: orderState;
}