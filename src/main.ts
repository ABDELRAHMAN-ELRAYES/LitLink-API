import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './infrastructure/config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get the ConfigService to get access to configuration variables.
  const config = app.get(ConfigService);
  const port = config.get('port');
  await app.listen(port);
}
bootstrap();
