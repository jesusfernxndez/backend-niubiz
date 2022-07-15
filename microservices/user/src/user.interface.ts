import { Document, Types } from 'mongoose';

export interface User {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
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

export interface UserModel extends Omit<User, 'auditProperties'>, Document {
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
