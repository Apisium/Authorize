import { BaseContextClass } from 'egg'
import {
  Controller,
  Post,
  Body
} from 'egg-pig'

@Controller('api/v1')
export default class HomeController extends BaseContextClass {
  @Post('register')
  public register (@Body() body) {
    return this.service.api.register(body)
  }
}
