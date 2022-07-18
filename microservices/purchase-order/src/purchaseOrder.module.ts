import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { PurchaseOrderSchema } from './puchaseOrder.schema';
import { PuchaseOrderController } from './purchaseOrder.controller';
import { PurchaseOrderService } from './purchaseOrder.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PuchaseOrderController],
  providers: [
    PurchaseOrderService,
    {
      provide: 'PURCHASE_ORDER_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('PurchaseOrder', PurchaseOrderSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class PuchaseOrderModule {}
