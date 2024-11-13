import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateBookingDto{
    
    @IsString()
    @IsNotEmpty()
    groupId:string

    @IsString()
    @IsNotEmpty()
    facilityId:string

    @IsDateString()
    @IsNotEmpty()
    bookingDate:string
}