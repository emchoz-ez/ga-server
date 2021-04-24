import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import carsService from './cars.service';
import CreateCarDto from './dto/createCar.dto';
import UpdateCarDto from './dto/updateCar.dto';

@Controller('car')
export default class CarsController {

  constructor(
    private readonly carsService: carsService
  ) {}
 
  @Get()
  getAllCars() {
    return this.carsService.getAllcars();
  }
 
  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }
 
  @Post()
  async createCar(@Body() Car: CreateCarDto) {
    return this.carsService.createCar(Car);
  }
 
  @Put(':id')
  async replaceCar(@Param('id') id: string, @Body() Car: UpdateCarDto) {
    return this.carsService.updateCar(id, Car);
  }
 
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    this.carsService.deleteCar(id);
  }
}