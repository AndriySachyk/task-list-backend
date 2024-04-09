import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { corsOptions } from './cors.config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors(corsOptions);
  app.use(cors());
  
  app.setGlobalPrefix("/api")
  
  await app.listen(5555);
}
bootstrap();
