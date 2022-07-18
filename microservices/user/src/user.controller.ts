import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO } from './user.dto';
import { UserModel } from './user.interface';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.service.getUsers();
  }

  @Get('/:idUser')
  async findUser(@Param('idUser') idUser: string): Promise<UserModel> {
    return this.service.findUser(idUser);
  }

  @Post()
  async createUser(@Body() user: UserRequestDTO): Promise<void> {
    this.service.createUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      status: {
        value: user.status?.value ?? 1,
        description: user.status?.description ?? 'Active',
      },
      auditProperties: {
        dateCreate: new Date(),
        dateUpdate: new Date(),
        userCreate: {
          idUser: user.auditProperties.userCreate.idUser,
          email: user.auditProperties.userCreate.email,
        },
        activeRecord: true,
      },
    });
  }
}
