import { NestFactory } from '@nestjs/core';
import { VehicleModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(VehicleModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();