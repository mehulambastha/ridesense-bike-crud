import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateBikeDtoType } from '../dto/create-bike.dto';
import { UpdateBikeDtoType } from '../dto/update-bike.dto';
import { Bike } from '../entities/bike.entity'; // Import the Bike entity
import { winstonLogger } from "../../config/winston-logger.config";

// The main Bike Service. This file handles all the logic behind the routes.
@Injectable()
export class BikeService {
  constructor(private prisma: PrismaService) { }
  //defining winstonLogger as simple 'logger' so that I can refer to it in the scope of this srevice file itself, through the 'this' syntax.
  // Kept it outside the contructore to keep it clean and separate injections.
  private readonly logger = winstonLogger;

  // A custom function whose purpose a kind of typecasting we can say. Takes in a bike (any) object but returns a specific type Bike. Its used exclusively when sending out API responses to the client to ensure consistency in reponses.
  private mapToBikeEntity(bike: any): Bike {
    return {
      id: bike.id,
      make: bike.make,
      model: bike.model,
      year: bike.year,
      type: bike.type,
    }
  }

  // Create Bike function.
  async createBike(data: CreateBikeDtoType): Promise<Bike> {
    try {
      // logging important events communicating direclty with the database.
      this.logger.info(`Creating a new bike with data: ${JSON.stringify(data)}`);

      // explicitly defined the properties of tbe data object to account for the difference in type of 'type' paramater.
      // Since SQLite3 database does not support Enum type, the database schema has defined 'type' as a String, whereas in Zod validations, when the object comes through CreateBikeDto, the 'type' is an enum of strings. Directly doing ...create({data}) will not work in this case.
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

  // SImply gettign all bikes. Not much to explain here.
  async getBikes(): Promise<Bike[]> {
    this.logger.info(`Fetching all bikes.`)
    try {
      const bikes = await this.prisma.bike.findMany();
      return bikes.map(this.mapToBikeEntity);
    } catch (error) {
      throw error
    }
  }

  // Simple getById operation on the Bikes table. NOt much to explain here
  async getBikeById(id: string): Promise<Bike> {
    try {
      const bike = await this.prisma.bike.findUnique({
        where: { id },
      });

      // using the private method to cast the bike object to a specific type before sending out to client
      return this.mapToBikeEntity(bike);
    } catch (error) {
      throw error
    }
  }


  // Patch funcion for the Bike table. Uses uuid (id) as the unique identifier. 
  // The UpdateBikeDtoType is a partial instance of the CreateBikeDtoType meaning it can have the SAME structure as CreateBikeDtoType or have a subset of its properties.
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


  // Fuction to delete a bike using uuid
  async deleteBike(id: string): Promise<Bike> {

    try {
      const bike = await this.prisma.bike.findUnique({
        where: { id }
      })
      // Logging if the bike is not present in database.
      if (!bike) {
        this.logger.warn(`Bike with id ${id} does not exist.`)
      }
      const deletedBike = await this.prisma.bike.delete({
        where: { id },
      });

      // casting to class Bike before sending to client
      return this.mapToBikeEntity(deletedBike);

    } catch (error) {
      throw error
    }
  }
}
