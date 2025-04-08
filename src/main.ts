import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { cookieParserMiddleware } from './common/middlewares/cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  formDataParserMiddleware,
  jsonParserMiddleware,
} from './common/middlewares/form-data-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    rawBody: true,
  });

  // Middlewares
  app.use(cookieParserMiddleware);
  app.use(formDataParserMiddleware);
  app.use(jsonParserMiddleware)

  // get the ConfigService to get access to configuration variables.
  const config = app.get(ConfigService);
  const port = config.get('port');
  await app.listen(port);
}
bootstrap();
