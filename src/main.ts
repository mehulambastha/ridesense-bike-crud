import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './config/winston-logger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
import { CustomExceptionFilter } from './filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger
  });
  const PORT = process.env.PORT || 3001

  // Connecting swagger
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document)

  //Using a global exception filter
  app.useGlobalFilters(new CustomExceptionFilter());

  winstonLogger.info('Application starting...');
  await app.listen(PORT);
  winstonLogger.info(`Application running on port ${PORT}`);
}
bootstrap();
