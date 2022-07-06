import {Injectable, UseGuards} from '@nestjs/common';
import { OktaGuard } from "./guards/okta.guard";

@Injectable()
export class AppService {

  @UseGuards(OktaGuard)
  getHello(): string {
    return 'Hello World!';
  }
}
