import { Controller, Get, Post, Body, Param, Patch, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { UpdateBikeDto } from '../dto/update-bike.dto';
import { winstonLogger } from '../../config/winston-logger.config';
import { ApiBody } from '@nestjs/swagger';
import { BikeSwaggerSchema } from '../swagger/bike.swagger.schema';
import { BikeSwaggerExample } from '../swagger/bike.swagger.examples';
import { BikeService } from '../services/bike.service';

// NOTE:
// Highlight of the controller here is that logs are generated with ample information whenever a route is hit.

// The main controller file for the Bikes.
@Controller('bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) { }
  // Again calliing the winstonLogger as logger to log any messages arising from this controller file.
  private readonly logger = winstonLogger;

  // POST method on the 'bike' route defined above in the @Controller declaration.
  @Post()
  @ApiBody({
    // Defining Schema and Example here for SwaggerUI. 
    schema: BikeSwaggerSchema,
    examples: BikeSwaggerExample,
  })
  async create(@Body() body: any) {
    this.logger.info(`POST /bikes - Payload ${JSON.stringify(body)}`);
    // parsing the given data through the DTO.
    const parsedData = CreateBikeDto.safeParse(body);

    if (!parsedData.success) {
      this.logger.warn('Data parsing error.')

      // NOTE: 
      // This is done to send a 'pretty' error message to the client. In cases of Zod validation errors, a whole lot of errors are thrown which is not easily readable. This code block here extracts the error status, the message and the path where the error occured and creates a consistent object to be thrown as an error whenever necessary.
      const errorMessages = parsedData.error.errors.map((erorr) => ({
        field: erorr.path.join('.'),
        message: erorr.message,
      }))
      throw new BadRequestException({
        message: 'Validation Error',
        errors: errorMessages,
      });
    }
    return this.bikeService.createBike(parsedData.data);
  }

  // GET method on the 'bikes' route to get all bikes data.
  @Get()
  async findAll() {
    this.logger.info('GET /bikes');
    try {
      return this.bikeService.getBikes();
    } catch (error) {
      this.logger.error(`Erroring fetching bikes: ${error}`);
      throw new BadRequestException(`Erroring fetching bikes: ${error}`);
    }
  }

  // GET method with 'id' parameter to get data of one bike
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.info(`GET /bikes/${id}`);
    try {
      const bike = this.bikeService.getBikeById(id);

      if (!bike) {
        this.logger.warn(`Bike with id ${id} not found.`)
        throw new NotFoundException(`Bike with id ${id} not found.`);
      }

      return bike;
    } catch (error) {
      this.logger.error(`Error finding bike with ID ${id}: ${error.message}`);
      throw error;
    }

  }

  @Patch(':id')
  @ApiBody({
    // Again defining schema and example for this route.
    schema: BikeSwaggerSchema,
    examples: BikeSwaggerExample,
  })
  async update(@Param('id') id: string, @Body() body: any) {
    this.logger.info(`PATCH /bikes/${id} - Payload ${JSON.stringify(body)}`);
    try {
      const parsedData = UpdateBikeDto.safeParse(body);
      if (!parsedData.success) {
        this.logger.warn('Data parsing error.')

        // NOTE: 
        // This is done to send a 'pretty' error message to the client. In cases of Zod validation errors, a whole lot of errors are thrown which is not easily readable. This code block here extracts the error status, the message and the path where the error occured and creates a consistent object to be thrown as an error whenever necessary.
        const errorMessages = parsedData.error.errors.map((erorr) => ({
          field: erorr.path.join('.'),
          message: erorr.message,
        }))
        throw new BadRequestException({
          message: 'Validation Error',
          errors: errorMessages,
        });
      }
      return this.bikeService.updateBike(id, parsedData.data);
    } catch (error) {
      this.logger.error(`Error updating bike with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  // DELETE method on the 'bike' route to delete a bike data.
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.info(`GET /bikes/${id}`);
    return this.bikeService.deleteBike(id);
  }
}
