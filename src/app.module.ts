import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeModule } from './bike/bike.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [BikeModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
