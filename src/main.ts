import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}
bootstrap();
