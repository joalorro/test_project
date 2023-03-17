import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatMessageData } from 'src/constants/interfaces';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() chatData: ChatMessageData) {
    this.logger.log('received message', chatData);
    this.server.emit('message', chatData);
  }
}
