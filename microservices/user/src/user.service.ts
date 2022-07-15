import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserModel } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserModel>,
  ) {}

  async getUsers(): Promise<UserModel[]> {
    return this.userModel
      .find({
        'auditProperties.activeRecord': true,
      })
      .exec();
  }

  async findUser(idUser: string): Promise<UserModel> {
    return this.userModel
      .findOne({
        _id: idUser,
        'auditProperties.activeRecord': true,
      })
      .exec();
  }

  async createUser(user: User): Promise<void> {
    await this.userModel.create(user);
  }
}
