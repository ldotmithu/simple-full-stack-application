import { Module } from '@nestjs/common';
import { VehicleController } from './app.controller';
import { VehicleService } from './app.service';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
