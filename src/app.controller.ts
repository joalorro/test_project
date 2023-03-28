import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

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
  async connect(@Body() data): Promise<string> {
    console.log('DATA', data);
    let users = (await this.cacheManager.get('users')) || [];
    console.log('users', users);
    await this.cacheManager.set('users', [data, ...users]);
    users = await this.cacheManager.get('users');
    console.log('added', users);
    return 'yes hello iam briam';
  }
}
