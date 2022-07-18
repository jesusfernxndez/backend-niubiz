import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductRequestDTO } from './product.dto';
import { ProductModel } from './product.interface';
import { ProductService } from './product.service';
import { v4 } from 'uuid';

@Controller()
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductModel[]> {
    return this.service.getProducts();
  }

  @Get('/:idProduct')
  async findProduct(
    @Param('idProduct') idProduct: string,
  ): Promise<ProductModel> {
    return this.service.findProduct(idProduct);
  }

  @Post()
  async createProduct(@Body() product: ProductRequestDTO): Promise<void> {
    this.service.createProduct({
      code: v4(),
      name: product.name,
      url: product.url,
      description: product.description,
      price: product.price,
      status: {
        value: product.status?.value ?? 1,
        description: product.status?.description ?? 'Active',
      },
      auditProperties: {
        dateCreate: new Date(),
        dateUpdate: new Date(),
        userCreate: {
          idUser: product.auditProperties.userCreate.idUser,
          email: product.auditProperties.userCreate.email,
        },
        activeRecord: true,
      },
    });
  }
}
