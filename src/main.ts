import { NestFactory } from '@nestjs/core';
import { HypersignMailClientModule } from './mail-client.module';

async function bootstrap() {
  const app = await NestFactory.create(HypersignMailClientModule);
  await app.listen(3000);
}
bootstrap();
