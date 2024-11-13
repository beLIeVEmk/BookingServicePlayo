
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/common/config';
import { BookingModel, BookingSchema } from 'src/schema/booking.schema';

@Module({
  imports: [MongooseModule.forRoot(config.db.mongo.database.connectionString),
    MongooseModule.forFeature([{ name: BookingModel, schema: BookingSchema,collection:config.db.mongo.collections.group }]),
  ],
  exports:[MongooseModule]
})
export class MongoModule {}
