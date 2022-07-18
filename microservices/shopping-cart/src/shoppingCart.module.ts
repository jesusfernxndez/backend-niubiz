import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { ShoppingCartController } from './shoppingCart.controller';
import { ShoppingCartSchema } from './ShoppingCart.schema';
import { ShoppingCartService } from './shoppingCart.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    {
      provide: 'SHOPPING_CART_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('ShoppingCart', ShoppingCartSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class ShoppingCartModule {}
