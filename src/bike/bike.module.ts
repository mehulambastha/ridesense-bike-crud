import { Module } from '@nestjs/common';
import { BikeController } from './controllers/bike.controller';
import { BikeService } from './services/bike.service';
import { PrismaService } from 'prisma/prisma.service';

// The main bike module. Imports the controllers and services. Since BikeService depends on PrismaSerice, I have imported that too.
@Module({
  controllers: [BikeController],
  providers: [BikeService, PrismaService]
})
export class BikeModule { }
