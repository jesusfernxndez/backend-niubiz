import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
