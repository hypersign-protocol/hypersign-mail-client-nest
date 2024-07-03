import { Queue } from 'bullmq';
export declare class HypersignMailClientService {
    private readonly queue;
    constructor(queue: Queue);
    addJobsInBulk(jobs: {
        serverName: string;
        to: string;
        subject: string;
        message: any;
    }[]): Promise<void>;
}
