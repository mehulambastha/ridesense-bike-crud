import { Test, TestingModule } from '@nestjs/testing';
import { BikeController } from './bike.controller';
import { BikeService } from '../services/bike.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('BikeController', () => {
  let controller: BikeController;
  let service: BikeService;

  // providing both BikeService and PrismaService to ensure the test build does not fail as BikeService depends on PrismaService.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BikeController],
      providers: [BikeService, PrismaService],
    }).compile();

    service = module.get<BikeService>(BikeService);
    controller = module.get<BikeController>(BikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
