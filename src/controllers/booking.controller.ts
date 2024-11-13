import { Controller, Post,Headers, Body, BadRequestException, Delete, HttpStatus, Query, Get } from "@nestjs/common";
import axios from "axios";
import { CreateBookingDto } from "src/dto/createBooking.dto";
import { BookingService } from "src/services/booking.service";
import { HelperFunctions } from "src/utils/helperFunctions";

@Controller('booking')
export class BookingController{
    constructor(
        private readonly helperFunctions:HelperFunctions,
        private readonly bookService:BookingService
    ){}

    @Post('createBooking')
    async createBooking(@Headers('Authorization') jwtToken:string,@Body() reqBody:CreateBookingDto){
        try {
            const userData=await this.helperFunctions.validateToken(jwtToken);
            if(userData['role']!='user'){
                throw new BadRequestException('Only user can create booking')
            }
            const response=await this.bookService.createBooking(reqBody,userData['_id'],jwtToken);
            return this.helperFunctions.createResObj(HttpStatus.CREATED,response);
        } catch (error) {
            throw this.helperFunctions.createErrResBody(error);
        }
    }

    @Delete('deleteBooking')
    async deleteBooking(@Headers('Authorization') jwtToken:string,@Query('id')id:string){
        try {
            const userData=await this.helperFunctions.validateToken(jwtToken);
            if(userData['role']!='user'){
                throw new BadRequestException('Only user can create booking')
            }
            await this.bookService.deleteBooking(userData['_id'],id);
            return this.helperFunctions.createResObj(HttpStatus.OK,{});
        } catch (error) {
            throw this.helperFunctions.createErrResBody(error);
        }
    }

    @Get('getBookingInfo')
    async getBookingInfo(@Headers('Authorization') jwtToken:string,@Query('id')id:string){
        try {
            const userData=await this.helperFunctions.validateToken(jwtToken);
            if(userData['role']!='user'){
                throw new BadRequestException('Only user can create booking')
            }
            const info=await this.bookService.getBookingInfo(id);
        } catch (error) {
            throw this.helperFunctions.createErrResBody(error);
        }
    }
}