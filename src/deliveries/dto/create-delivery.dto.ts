import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { DeliveryState } from "src/enums/deliveryState.enum";

export class CreateDeliveryDto {
    
    @ApiProperty()
    @IsIn([DeliveryState.Default, DeliveryState.Delivery, DeliveryState.Finished, DeliveryState.Preparation])
    state: DeliveryState;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    
}