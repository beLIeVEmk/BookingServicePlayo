import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperFunctions } from './utils/helperFunctions';
import { MongoModule } from './database/database.module';
import { MailModule } from './modules/mail.module';
import { BookingModule } from './modules/booking.module';

@Module({
  imports: [MailModule,BookingModule],
  controllers: [AppController],
  providers: [AppService,HelperFunctions,MongoModule],
})
export class AppModule {}
