import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ProductShoppingCart,
  ShoppingCart,
  ShoppingCartModel,
} from './shoppingCart.interface';

@Injectable()
export class ShoppingCartService {
  constructor(
    @Inject('SHOPPING_CART_MODEL')
    private readonly model: Model<ShoppingCartModel>,
  ) {}

  async findShoppingCart(
    idUser: string,
    idShoppingCart: string,
  ): Promise<ShoppingCartModel> {
    return this.model
      .findOne({
        _id: idShoppingCart,
        'auditProperties.userCreate.idUser': idUser,
        'auditProperties.activeRecord': true,
      })
      .exec();
  }

  async createShoppingCart(shoppingCart: ShoppingCart): Promise<void> {
    const existUserShoppingCartActive = await this.model
      .findOne({
        'auditProperties.userCreate.idUser':
          shoppingCart.auditProperties.userCreate.idUser,
        'auditProperties.activeRecord': true,
        'status.value': 1,
      })
      .exec();
    if (existUserShoppingCartActive) {
      throw new Error('User already have a shopping cart active');
    }
    await this.model.create(shoppingCart);
  }

  async updateShoppingCart(idUser: string, products: ProductShoppingCart[]) {
    const existUserShoppingCartActive = await this.model.findOne({
      'auditProperties.userCreate.idUser': idUser,
      'auditProperties.activeRecord': true,
      'status.value': 1,
    });
    if (!existUserShoppingCartActive) {
      throw new Error("User don't have a shopping cart active");
    }
    await this.model
      .updateOne(
        {
          'auditProperties.userCreate.idUser': idUser,
          'auditProperties.activeRecord': true,
          'status.value': 1,
        },
        { products },
      )
      .exec();
  }
}
