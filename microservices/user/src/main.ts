import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.setGlobalPrefix('/api/users/v1.0');
  await app.listen(3004);
}
bootstrap();
