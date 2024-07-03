import { DynamicModule, Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HypersignMailClient } from './mail-client.service';

interface HypersignMailClientModuleOptions {
  redis?: {
    host: string;
    port: number;
  };
  queueName?: string;
}

@Global()
@Module({})
export class HypersignMailClientModule {
  static forRoot(options?: HypersignMailClientModuleOptions): DynamicModule {
    const { redis, queueName } = options;
    return {
      module: HypersignMailClientModule,
      imports: [
        BullModule.forRoot({
          connection: redis || { host: 'localhost', port: 6379 },
        }),
        BullModule.registerQueue({
          name: queueName || 'mail-queue',
        }),
      ],
      providers: [HypersignMailClient],
      exports: [HypersignMailClient],
    };
  }
}
