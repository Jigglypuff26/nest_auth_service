import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  test() {
    return { 
      message: 'API is working!',
      timestamp: new Date().toISOString()
    };
  }

  @Get('health')
  health() {
    return { 
      status: 'OK',
      service: 'NestJS Auth Service',
      timestamp: new Date().toISOString()
    };
  }
}