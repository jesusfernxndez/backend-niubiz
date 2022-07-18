import { Types, Schema } from 'mongoose';

export const ProductSchema = new Schema({
  code: String,
  name: String,
  url: String,
  description: String,
  price: Number,
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
