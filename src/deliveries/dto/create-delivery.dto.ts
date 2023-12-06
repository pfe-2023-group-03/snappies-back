import { ApiProperty } from "@nestjs/swagger";
import { DeliveryState } from "src/enums/deliveryState.enum";

export class CreateDeliveryDto {
    
    @ApiProperty()
    state: DeliveryState;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    day: Date;
}