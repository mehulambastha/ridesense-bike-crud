import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateBikeDtoType } from '../dto/create-bike.dto';
import { UpdateBikeDtoType } from '../dto/update-bike.dto';
import { Bike } from '../entities/bike.entity'; // Import the Bike entity
import { winstonLogger } from "src/config/winston-logger.config";

@Injectable()
export class BikeService {
  constructor(private prisma: PrismaService) { }
  private readonly logger = winstonLogger;

  private mapToBikeEntity(bike: any): Bike {
    return {
      id: bike.id,
      make: bike.make,
      model: bike.model,
      year: bike.year,
      type: bike.type,
    }
  }

  async createBike(data: CreateBikeDtoType): Promise<Bike> {
    try {
      this.logger.info(`Creating a new bike with data: ${JSON.stringify(data)}`);
      const createdBike = await this.prisma.bike.create({
        data: {
          make: data.make,
          model: data.model,
          year: data.year,
          type: data.type,
        },
      });
      return this.mapToBikeEntity(createdBike);

    } catch (error) {
      this.logger.error(`Failed to create bike: ${error.message}`);
      throw error
    }
  }

  async getBikes(): Promise<Bike[]> {
    this.logger.info(`Fetching all bikes.`)
    try {
      const bikes = await this.prisma.bike.findMany();
      return bikes.map(this.mapToBikeEntity);
    } catch (error) {
      throw error
    }
  }

  async getBikeById(id: string): Promise<Bike> {
    try {
      const bike = await this.prisma.bike.findUnique({
        where: { id },
      });
      return this.mapToBikeEntity(bike);
    } catch (error) {
      throw error
    }
  }

  async updateBike(id: string, data: UpdateBikeDtoType): Promise<Bike> {
    try {
      const updatedBike = await this.prisma.bike.update({
        where: { id },
        data,
      });
      return this.mapToBikeEntity(updatedBike);
    } catch (error) {
      throw error
    }
  }

  async deleteBike(id: string): Promise<Bike> {

    try {
      const bike = await this.prisma.bike.findUnique({
        where: { id }
      })
      if (!bike) {
        this.logger.warn(`Bike with id ${id} does not exist.`)
      }
      const deletedBike = await this.prisma.bike.delete({
        where: { id },
      });
      return this.mapToBikeEntity(deletedBike);

    } catch (error) {
      throw error
    }
  }
}
