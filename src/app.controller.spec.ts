import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // custom test message for the get response on the root route. 
  // by default it says hello world!
  describe('root', () => {
    it('Do not change default response of root GET method.', () => {
      expect(appController.getHello()).toBe('Welcome to RideSense Bike Library. Head over to /api/ for swagger documentation');
    });
  });
});
