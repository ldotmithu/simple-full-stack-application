import { Body, Controller, Get, Post } from '@nestjs/common';
import { VehicleService } from './app.service';

interface VEHICLE {
  make: string;
  model: string;
  year: number;
}

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async getData() {
    return this.vehicleService.getData();
  }

  @Post()
  async createData(@Body() vehicle: VEHICLE) {
    return this.vehicleService.createData(vehicle);
  }
}




















