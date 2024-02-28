import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get('/hi/:name')
  getHello(@Param('name') name): string {
    return this.appService.getHello(name);
  }
}
