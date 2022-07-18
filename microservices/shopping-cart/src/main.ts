import { NestFactory } from '@nestjs/core';
import { ShoppingCartModule } from './shoppingCart.module';

async function bootstrap() {
  const app = await NestFactory.create(ShoppingCartModule);
  app.setGlobalPrefix('/api/shopping-cart/v1.0');
  await app.listen(3003);
}
bootstrap();
