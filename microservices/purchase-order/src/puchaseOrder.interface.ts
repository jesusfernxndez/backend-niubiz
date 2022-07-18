import { Types } from 'mongoose';

export type ProductPurchaseOrder = {
  idProduct: string;
  description: string;
  url: string;
  price: number;
  quantity: number;
};

export interface PurchaseOrder {
  readonly orderNumber: string;
  readonly shoppingNumber: string;
  readonly deliveryDate: Date;
  readonly products: ProductPurchaseOrder[];
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

export interface PurchaseOrderModel
  extends Omit<PurchaseOrder, 'auditProperties'>,
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
