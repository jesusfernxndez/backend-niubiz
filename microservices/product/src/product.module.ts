import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './product.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Product', ProductSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class ProductModule {}
