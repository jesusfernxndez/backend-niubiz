import { Types, Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
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
