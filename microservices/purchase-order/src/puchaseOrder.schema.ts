import { Schema, Types } from 'mongoose';

export const PurchaseOrderSchema = new Schema({
  orderNumber: String,
  shoppingNumber: String,
  deliveryDate: Date,
  products: [
    {
      idProduct: Types.ObjectId,
      description: String,
      url: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: {
    value: Number,
    description: String,
  },
  auditProperties: {
    dateCreate: Date,
    dateUpdate: Date,
    userCreate: {
      idUser: Types.ObjectId,
      email: String,
    },
    activeRecord: { type: Boolean, default: true },
  },
});
