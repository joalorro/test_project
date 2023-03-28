import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConnectRequestDto } from './dtos/connect-request.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/connect')
  async connect(@Body() data: ConnectRequestDto): Promise<string> {
    console.log('DATA', data);
    let users = await this.cacheManager.get('users');
    console.log('users', users);
    if (users) {
      users = JSON.parse(users);
    } else {
      users = [];
    }

    users.push(data.username);
    users = JSON.stringify(users);

    console.log('stringified users', users);

    await this.cacheManager.set('users', users);

    return 'yes hello iam briam';
  }
}
