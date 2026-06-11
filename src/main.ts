import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const environment = configService.get('NODE_ENV') || 'development';

  if (environment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Lowtrack API')
      .setDescription('The Lowtrack API description')
      .setVersion('1.0')
      .addTag('lowtrack')
      .build();

    const documentFactory = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }


  const port = configService.get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
