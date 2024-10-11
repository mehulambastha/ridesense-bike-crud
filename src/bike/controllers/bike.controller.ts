import { Controller, Get, Post, Body, Param, Patch, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { BikeService } from '../services/bike.service';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { UpdateBikeDto } from '../dto/update-bike.dto';
import { winstonLogger } from 'src/config/winston-logger.config';
import { ApiBody } from '@nestjs/swagger';
import { BikeSwaggerSchema } from '../swagger/bike.swagger.schema';
import { BikeSwaggerExample } from '../swagger/bike.swagger.examples';

@Controller('bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) { }
  private readonly logger = winstonLogger;

  @Post()
  @ApiBody({
    schema: BikeSwaggerSchema,
    examples: BikeSwaggerExample,
  })
  async create(@Body() body: any) {
    this.logger.info(`POST /bikes - Payload ${JSON.stringify(body)}`);
    const parsedData = CreateBikeDto.safeParse(body);

    if (!parsedData.success) {
      this.logger.warn('Data parsing error.')

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
    schema: BikeSwaggerSchema,
    examples: BikeSwaggerExample,
  })
  async update(@Param('id') id: string, @Body() body: any) {
    this.logger.info(`PATCH /bikes/${id} - Payload ${JSON.stringify(body)}`);
    try {
      const parsedData = UpdateBikeDto.safeParse(body);
      if (!parsedData.success) {
        this.logger.warn('Data parsing error.')
        throw new BadRequestException(parsedData.error.errors);
      }
      return this.bikeService.updateBike(id, parsedData.data);
    } catch (error) {
      this.logger.error(`Error updating bike with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.info(`GET /bikes/${id}`);
    return this.bikeService.deleteBike(id);
  }
}
