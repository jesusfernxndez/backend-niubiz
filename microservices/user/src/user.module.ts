import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from './database/database.module';
import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('User', UserSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class UserModule {}
