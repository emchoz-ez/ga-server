import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateCarDto from './dto/createCar.dto';
import Car from './cars.interface';
import UpdateCarDto from './dto/updateCar.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CarEntity from './car.entity'

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private carsRepository: Repository<CarEntity>
  ) {}

  getAllcars() {
    return this.carsRepository.find();
  }

  getCarById(id: string) {
    const car = this.carsRepository.findOne(id);
    if (car) {
      return car;
    }
    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  async updateCar(id: string, car: UpdateCarDto) {
    await this.carsRepository.update(id, car);
    const updatedCar = await this.carsRepository.findOne(id);
    if (updatedCar) {
      return updatedCar;
    }
    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  async createCar(car: CreateCarDto) {
    const newCar = await this.carsRepository.create(car);
    await this.carsRepository.save(newCar);
    return newCar;
  }

  async deleteCar(id: string) {
    const deleteResponse = await this.carsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
  }
}

export default CarsService;
