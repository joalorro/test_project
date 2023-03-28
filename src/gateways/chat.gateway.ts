import {
  CacheInterceptor,
  CacheKey,
  CACHE_MANAGER,
  Inject,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatMessageDto } from 'src/dtos/chat-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() chatData: ChatMessageDto) {
    this.logger.log('received message', chatData);
    this.server.emit('message', chatData);
  }

  // @CacheKey('paint_events')
  // @UseInterceptors(CacheInterceptor)
  @SubscribeMessage('paint')
  async handlePaint(@MessageBody() paintData) {
    this.logger.log('received paint event', paintData);
    let storedPoints = await this.cacheManager.get('paint');
    if (storedPoints) {
      storedPoints = JSON.parse(storedPoints);
    } else if (!storedPoints) {
      storedPoints = [];
    }

    storedPoints.push(paintData);
    storedPoints = JSON.stringify(storedPoints);

    console.log('stringified', storedPoints);

    await this.cacheManager.set('paint', storedPoints);
  }

  @SubscribeMessage('reset')
  async handleReset() {
    let data = await this.cacheManager.get('paint');
    console.log('datas before reset', data);

    console.log('resetting');
    await this.cacheManager.reset();

    data = await this.cacheManager.get('paint');
    console.log('datas after reset', data);
  }
}
