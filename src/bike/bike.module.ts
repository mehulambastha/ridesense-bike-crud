import { Module } from '@nestjs/common';
import { BikeController } from './controllers/bike.controller';
import { BikeService } from './services/bike.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BikeController],
  providers: [BikeService, PrismaService]
})
export class BikeModule { }
