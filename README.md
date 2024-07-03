### Using BullMQ in NestJS Project

#### Introduction
This document covers how to integrate BullMQ into a NestJS project to manage queues. BullMQ is a robust library built on top of Redis, providing reliable job processing capabilties.

#### Prerequisites
 - Node.js and npm installed
 - NestJS CLI installed( `npm install -g @nestjs/cli`)
 - Redis server running
 > **NOTE:**-  Ensure you are using Node.js version 18 for compatibility.
##### Step 1: Set Up Your NestJS Project
1. Create a new Project
 ```js 
  nest new ${project_name}
  ``` 
2. Navigate to the project
  ```js
 cd project_name  // navigate to existing project or newly created project.
  ```
##### Step 2: Install Required Packages
 1. Install BullMQ and Redis packages
  ```js
    npm install @nestjs/bullmq @nestjs/bull bullmq bull ioredis
  ```

##### Step 3: Configure BullMQ
 1. Configure the BullModule in `AppModule`:
 ```js
 // app.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',// or pass your own redis host
        port: 6379, // or pass your own redis port
      },
    }),
    BullQueueModule
  ],
    controllers: [],// Add your controller if any
  providers: []// Add your service,
  })
  export class AppModule{}
 ```

 ##### Step 4: Create a BullMQ Queue Module
 1. Generate a new module, service and controller for BullMQ implementation
  ```js
   nest g module bull-queue
   nest g service bull-queue
   nest g controller bull-queue
  ```
  2. Set up the queue in the module:
   ```js
     // bull-queue.module.ts
     import {Module} from '@nestjs/common'
     import {BullModule} from '@nestjs/bullmq'
     import {BullQueueService} from './bull-queue.service';
     import { BullQueueController } from './bull-queue.controller';


     @Module({
      import:[
      BullModule.registerQueue({
        name:'mail-queue'
      })],
      providers:[BullQueueService],
      exports:[BullQueueService],
      controllers:[BullQueueController]
     })
     export class BullQueueModule {}
   ```
   3. Implement the queue service:
   ```js
    //bull-queue.service.ts
    import {Injectable} from '@nestjs/common';
    import {InjectQueue} from '@nestjs/bull';
    import {Queue} from 'bullmq'

    @Injectable()
    export class BullQueueService{
      constructor(@InjectQueue('mail-queue') private readonly myQueue: Queue){}
      async addJobsInBulk(jobs: { serverName: string, to: string; subject: string; message: any }[])
      const bulkJobs= jobs.map(job=>({
        name:"sendMail", // name of the job
        data:{
          serverName:job.serverName,
          to:job.to,
          subject: job.subject,
          message:job.message
        }
      }))
      await this.myQueue.addBulk(bulkJobs)// addBulk is used to push list of jobs at a time in queue
    }
   ```
  > Note use `await this.myQueue.add('job-name', data)` to add single job to the queue.

   4. Implement the controller to handle job creation:
   ```js
     import { Controller, Post, Body } from '@nestjs/common';
     import { BullQueueService } from './bull-queue.service';
     @controller('bull-queue')
     export class BullQueueController{
      constructor(private readonly bullQueueService:BullQueueService){}
      @Post('add-job')
      async addJob(@Body() data: { serverName: string; to: string; subject: string; message: any }[],){
        await this.bullQueueService.addJobsInBulk(data);
        return {message:'JOb added to the queue successfully'}
      }
     }
   ```
   ##### Step 6: Running the Application:
   1. Start the NestJS application:
   ```js
     npm run start
   ```
   2. Test the Queue by Sending a POST Request:
  Use a tool like postman and send a request to `http://localhost:3000/bull-queue/add-job`
   ```js
[
     {
    "serverName":"XYZ", "to":"xyz@gmail.com","subject":"testing mail server","message":"<h1>Hi</h1>"
},]
   ```

