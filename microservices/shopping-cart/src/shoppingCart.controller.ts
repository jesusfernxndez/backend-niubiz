import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ProductAxiosDTO } from './axios/ProductAxios.dto';
import {
  CreateShoppingCartDTO,
  UpdateShoppingCartDTO,
} from './shoppingCart.dto';
import { ShoppingCartService } from './shoppingCart.service';
import { v4 } from 'uuid';
import { ShoppingCartModel } from './shoppingCart.interface';

@Controller()
export class ShoppingCartController {
  private readonly productAPI: AxiosInstance;
  constructor(private readonly service: ShoppingCartService) {
    this.productAPI = axios.create({
      baseURL: 'http://192.168.0.82:3001/api/product/v1.0',
    });
  }

  @Get('/:idUser/:idShoppingCart')
  async findShoppingCart(
    @Param('idUser') idUser: string,
    @Param('idShoppingCart') idShoppingCart: string,
  ): Promise<ShoppingCartModel> {
    return this.service.findShoppingCart(idUser, idShoppingCart);
  }

  @Post()
  async createShoppingCart(
    @Body() shoppingCart: CreateShoppingCartDTO,
  ): Promise<void> {
    const products = await Promise.all(
      shoppingCart.products.map((product) =>
        this.productAPI.get<ProductAxiosDTO>(`/${product.id}`).then((res) => {
          return {
            idProduct: res.data._id,
            description: res.data.description,
            url: res.data.url,
            price: res.data.price,
            quantity: product.quantity,
          };
        }),
      ),
    );
    this.service.createShoppingCart({
      shoppingNumber: v4(),
      products,
      status: {
        value: shoppingCart.status?.value ?? 1,
        description:
          shoppingCart.status?.description ?? 'Created shopping cart',
      },
      auditProperties: {
        dateCreate: new Date(),
        dateUpdate: new Date(),
        userCreate: {
          idUser: shoppingCart.auditProperties.userCreate.idUser,
          email: shoppingCart.auditProperties.userCreate.email,
        },
        activeRecord: true,
      },
    });
  }

  @Patch('/:idUser')
  async updateShoppingCart(
    @Param('idUser') idUser: string,
    @Body() shoppingCartProducts: UpdateShoppingCartDTO,
  ): Promise<void> {
    const products = await Promise.all(
      shoppingCartProducts.products.map((product) =>
        this.productAPI.get<ProductAxiosDTO>(`/${product.id}`).then((res) => {
          return {
            idProduct: res.data._id,
            description: res.data.description,
            url: res.data.url,
            price: res.data.price,
            quantity: product.quantity,
          };
        }),
      ),
    );
    this.service.updateShoppingCart(idUser, products);
  }

  @Patch('/event_purchase_order/:idUser/:idShoppingCart')
  async eventPurchaseOrderShoppingCart(
    @Param('idUser') idUser: string,
    @Param('idShoppingCart') idShoppingCart: string,
  ): Promise<void> {
    try {
      this.service.eventPurchaseOrderShoppingCart(idUser, idShoppingCart);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
