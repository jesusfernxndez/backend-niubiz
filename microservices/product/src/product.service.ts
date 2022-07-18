import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product, ProductModel } from './product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly model: Model<ProductModel>,
  ) {}

  async getProducts(): Promise<ProductModel[]> {
    return this.model
      .find({
        'auditProperties.activeRecord': true,
      })
      .exec();
  }

  async findProduct(idProduct: string): Promise<ProductModel> {
    return this.model
      .findOne({
        _id: idProduct,
        'auditProperties.activeRecord': true,
      })
      .exec();
  }

  async createProduct(product: Product): Promise<void> {
    await this.model.create(product);
  }
}
