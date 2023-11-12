import helmet from 'helmet';
import * as compression from 'compression';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { ChatServiceModule } from './chat-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  RmqOptionConfigs,
  NODE_ENV,
  BadRequestExceptionFilter,
  setupSwagger,
  APP_PORT_CHAT,
  APP_HOST,
} from '@app/main';

async function bootstrap() {
  const app = await NestFactory.create(ChatServiceModule);
  const appListen = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatServiceModule,
    RmqOptionConfigs,
  );

  /**
   * Enable Helmet
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   * https://github.com/helmetjs/helmet#how-it-works
   */
  if (NODE_ENV === 'production') {
    app.use(helmet());
  }

  /**
   * Enable Compression
   * Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
   * https://docs.nestjs.com/techniques/compression
   */
  app.use(compression());

  /**
   * Enable Cors
   * https://docs.nestjs.com/security/cors
   */
  app.enableCors();

  /**
   * Set Global Prefix
   * https://docs.nestjs.com/faq/global-prefix
   */
  app.setGlobalPrefix('api');

  /**
   * https://stackoverflow.com/questions/48851140/how-to-handle-typeorm-entity-field-unique-validation-error-in-nestjs
   */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new BadRequestExceptionFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  appListen.useGlobalPipes(new ValidationPipe({ transform: true }));

  /**
   * Set Swagger
   */
  setupSwagger(app);

  await appListen.listen();
  await app.listen(APP_PORT_CHAT, () => {
    console.log(`[WEB SERVICE ${NODE_ENV}]`, `//${APP_HOST}:${APP_PORT_CHAT}`);
  });
}

bootstrap();
