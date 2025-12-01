import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  public healthCheck() {
    const date = new Date().toISOString();
    const response = {
      status: 'OK',
      service: 'chaos-pet-api',
      timestamp: date,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
    return response;
  }
}
