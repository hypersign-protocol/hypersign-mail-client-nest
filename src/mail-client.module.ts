import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { HypersignMailClient } from './mail-clinet.service';
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
  providers: [HypersignMailClient],
})
export class HypersignMailClientModule {}
