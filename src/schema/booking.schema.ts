import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const bcrypt = require('bcrypt');

@Schema({versionKey:false})
class Booking{
    @Prop({required:true})
    groupId:string

    @Prop({required:true})
    facilityId:string

    @Prop({required:true})
    bookingDate:string

    @Prop({required:true})
    totalPrice:number
    
    @Prop({required:true})
    timeSlotId:number

    @Prop({required:true})
    bookingAdmin:string
}

export type BookingDocument=Document & Booking

export const BookingSchema=SchemaFactory.createForClass(Booking)

export const BookingModel=Booking.name