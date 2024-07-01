import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail-clinet';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'mail-queue' }),
  ],
  controllers: [],
  providers: [MailService],
})
export class HypersignMailClientModule {}
