import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.setGlobalPrefix('/api/product/v1.0');
  await app.listen(3001);
}
bootstrap();
