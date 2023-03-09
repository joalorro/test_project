import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ExampleModule } from './examples/examples.module';

@Module({
  imports: [ExampleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
