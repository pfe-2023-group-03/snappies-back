import { PartialType } from "@nestjs/swagger";
import { ApiProperty } from '@nestjs/swagger';
import { CreateDeliveryDto } from "./create-delivery.dto";
import { DeliveryState } from "src/enums/deliveryState.enum";

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto){
    
    @ApiProperty()
    state: DeliveryState;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    day: Date;
}