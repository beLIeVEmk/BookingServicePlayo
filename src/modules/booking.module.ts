import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { RedisFunction } from 'src/common/redisFunctions';
import { BookingController } from 'src/controllers/booking.controller';
import { MongoModule } from 'src/database/database.module';
import { BookingService } from 'src/services/booking.service';
import { MailService } from 'src/services/mail.service';
import { HelperFunctions } from 'src/utils/helperFunctions';


@Module({
  imports: [MongoModule],
  controllers: [BookingController],
  providers: [BookingService,HelperFunctions,MailService],
})
export class BookingModule {}