import { Types } from 'mongoose';

export type ProductShoppingCart = {
  idProduct: string;
  description: string;
  url: string;
  price: number;
  quantity: number;
};

export interface ShoppingCart {
  readonly shoppingNumber: string;
  readonly products: ProductShoppingCart[];
  readonly status: {
    value: number;
    description: string;
  };
  readonly auditProperties: {
    dateCreate: Date;
    dateUpdate: Date;
    userCreate: {
      idUser: string;
      email: string;
    };
    activeRecord: boolean;
  };
}

export interface ShoppingCartModel
  extends Omit<ShoppingCart, 'auditProperties'>,
    Document {
  readonly _id: Types.ObjectId;
  readonly auditProperties: {
    dateCreate: Date;
    dateUpdate: Date;
    userCreate: {
      idUser: Types.ObjectId;
      email: string;
    };
    activeRecord: boolean;
  };
}
