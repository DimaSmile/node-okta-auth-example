import {Controller, Get, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {OktaGuard} from "./guards/okta.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/locked')
  @UseGuards(OktaGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
