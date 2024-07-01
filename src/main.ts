import { NestFactory } from '@nestjs/core';
import { MailClientModule } from './mail-client.module';

async function bootstrap() {
  const app = await NestFactory.create(MailClientModule);
  await app.listen(3000);
}
bootstrap();
