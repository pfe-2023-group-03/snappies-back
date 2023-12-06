import { PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { ApiProperty } from '@nestjs/swagger';
import { orderState } from "src/enums/orderState.enum";
import { Client } from "../../client/entities/client.entity";
import { Deliverer } from "../../deliverer/entities/deliverer.entity";


export class UpdateOrdertDto extends PartialType(CreateOrderDto) {

    @ApiProperty()
    number: number;

    @ApiProperty()
    clientId: Client;

    @ApiProperty()
    delivererId: Deliverer;

    @ApiProperty()
    state: orderState;
}