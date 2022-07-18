import { NestFactory } from '@nestjs/core';
import { PuchaseOrderModule } from './purchaseOrder.module';

async function bootstrap() {
  const app = await NestFactory.create(PuchaseOrderModule);
  app.setGlobalPrefix('/api/purchase-order/v1.0');
  await app.listen(3002);
}
bootstrap();
