import { BadRequestException, HttpCode, Injectable, Put } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { isValidObjectId, Model } from "mongoose";
import { RedisFunction } from "src/common/redisFunctions";
import { BookingDocument, BookingModel } from "src/schema/booking.schema";
import { CONSTANTS } from "src/utils/contants";
import { HelperFunctions } from "src/utils/helperFunctions";
import { MailService } from "./mail.service";


@Injectable()
export class BookingService{

    constructor(@InjectModel(BookingModel) private readonly bookModel:Model<BookingDocument>,
                private readonly helperFunctions:HelperFunctions,
                private readonly mailService:MailService
                ){}

    async createBooking(body,uuid:string,jwtToken:string){
        try {
            const facilityInfo=await axios.get(CONSTANTS.axiosURLs.getFacInfo(body['facilityId']),{
                headers:{
                    'Authorization':jwtToken
                }
            }).catch((error)=>{
                throw new BadRequestException('Invalid facility request');
            })
            if(facilityInfo.data['delFlag']!=-1){
                if(this.helperFunctions.getTimeInMillis(body['bookingDate'])>=facilityInfo.data['delFlag']){
                    throw new BadRequestException('Cannot perform booking on selected date');
                }
            }
            const groupInfo=await axios.get(CONSTANTS.axiosURLs.getGroupInfo(body['groupId']),{
                headers:{
                    'Authorization':jwtToken
                }
            }).catch((error)=>{
                throw new BadRequestException('Invalid group request');
            })
            const userInfo=await axios.get(CONSTANTS.axiosURLs.getUserInfo(),{
                headers:{
                    Authorization:jwtToken
                }
            }).catch((error)=>{
                throw new BadRequestException('Invalid user request');
            })
            if(this.helperFunctions.isMoreThan7DaysAway(body['groupId'])){
                throw new BadRequestException('Cannot book for date more than a week')
            }
            const pricePerHead=facilityInfo.data['pricePerHead'];
            const totalMembers=groupInfo.data['groupSize'];
            if(totalMembers>facilityInfo.data['maxGroupSize']){
                throw new BadRequestException(`Group size must be less than or equal to ${facilityInfo.data['maxGroupSize']}`)
            }
            body['totalPrice']=pricePerHead*totalMembers;
            if(uuid!=facilityInfo.data['adminId']){
                throw new BadRequestException('Admins only can perform booking');
            }
            if(body['timeSlotIndex']<0 || body['timeSlotIndex']>=facilityInfo.data['timeSlots'].length){
                throw new BadRequestException('Invalid time slot request');
            }
            body['bookingAdmin']=uuid;
            await this.mailService.sendMail(userInfo.data['email'],'Booking Confirmed',`Your booking for booking date ${new Date(body['bookingDate'])} has been confirmed`)
            return await this.bookModel.create(body);
        } catch (error) {
            throw error;
        }
    }
    async deleteBooking(uuid:string,bookingId:string){
        try {
            const bookingInfo=await this.bookModel.findById(bookingId);
            if(!bookingInfo){
                throw new BadRequestException('Invalid bookingId request');
            }
            if(uuid!=bookingInfo.bookingAdmin){
                throw new BadRequestException('Cannot cancel booking as you havent done the booking');
            }
            await this.bookModel.deleteOne({_id:bookingId});
        } catch (error) {
            throw error;
        }
    }

    async getBookingInfo(id:string){
        try {
            return await this.bookModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
}