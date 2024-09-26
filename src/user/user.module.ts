import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from './connection/connection';

@Module({
  controllers: [UserController],
  providers: [
    UserService, // * standard injection example
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection, // * dynamic module injection / class provider
    },
  ],
})
export class UserModule {}
