import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
@Injectable()
export class HypersignMailClient {
  constructor(@InjectQueue('mail-queue') private readonly queue: Queue) { }
  async addJobsInBulk(
    jobs: { serverName: string; to: string; subject: string; message: any }[],
  ) {
    Logger.log('addJobsInBulk() method starts', 'HypersignMailClient');
    const bulkJobs = jobs.map((job) => ({
      name: 'sendMail',
      data: {
        serverName: job.serverName,
        to: job.to,
        subject: job.subject,
        message: job.message,
      },
    }));
    await this.queue.addBulk(bulkJobs);
  }
}
