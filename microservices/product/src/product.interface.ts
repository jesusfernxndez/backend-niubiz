import { Document, Types } from 'mongoose';

export interface Product {
  readonly code: string;
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly price: number;
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

export interface ProductModel
  extends Omit<Product, 'auditProperties'>,
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
