import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
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
    const find = await this.model.findOne({
      _id: idShoppingCart,
      'auditProperties.activeRecord': true,
    });
    if (!find) {
      throw new Error('Shopping cart not found');
    }
    if (find.auditProperties.userCreate.idUser.toString() !== idUser) {
      throw new Error('Unauthorized');
    }
    return find;
  }

  async createShoppingCart(shoppingCart: ShoppingCart): Promise<void> {
    const existUserShoppingCartActive = await this.model
      .findOne({
        'auditProperties.userCreate.idUser':
          shoppingCart.auditProperties.userCreate.idUser,
        'auditProperties.activeRecord': true,
        'status.value': { $in: [1, 2] },
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
      'status.value': { $in: [1, 2] },
    });
    if (!existUserShoppingCartActive) {
      throw new Error("User don't have a shopping cart active");
    }
    await this.model
      .updateOne(
        {
          'auditProperties.userCreate.idUser': idUser,
          'auditProperties.activeRecord': true,
          'status.value': { $in: [1, 2] },
        },
        {
          products,
          status: { value: 2, description: 'Updated shopping cart products' },
        },
      )
      .exec();
  }

  async eventPurchaseOrderShoppingCart(idUser: string, idShoppingCart: string) {
    const shoppingCart = await this.model.find({
      'auditProperties.activeRecord': true,
      'status.value': { $in: [1, 2] },
    });
    const find = shoppingCart.find(
      (SC) =>
        SC._id.toString() === idShoppingCart &&
        SC.auditProperties.userCreate.idUser.toString() === idUser,
    );
    if (!find) {
      throw new Error('Shopping cart not available for purchase order');
    }
    await this.model.updateOne(
      { _id: idShoppingCart },
      { status: { value: 3, description: 'Puchase order generated' } },
    );
  }
}
