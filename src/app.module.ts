import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperFunctions } from './utils/helperFunctions';
import { MongoModule } from './database/database.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,HelperFunctions,MongoModule],
})
export class AppModule {}
