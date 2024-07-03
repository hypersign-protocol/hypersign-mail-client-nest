"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypersignMailClientService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
let HypersignMailClientService = class HypersignMailClientService {
    constructor(queue) {
        this.queue = queue;
    }
    async addJobsInBulk(jobs) {
        common_1.Logger.log('addJobsInBulk() method starts', 'HypersignMailClient');
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
};
exports.HypersignMailClientService = HypersignMailClientService;
exports.HypersignMailClientService = HypersignMailClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('mail-queue')),
    __metadata("design:paramtypes", [bullmq_1.Queue])
], HypersignMailClientService);
//# sourceMappingURL=hypersign-mail-client.service.js.map