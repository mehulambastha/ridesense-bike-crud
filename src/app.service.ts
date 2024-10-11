import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to RideSense Bike Library. Head over to /api/ for swagger documentation';
  }
}
