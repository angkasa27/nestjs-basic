import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {
  createUserRepository,
  UserRepository,
} from './user-repository/user-repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService, // * standard injection example
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection, // * dynamic module injection / class provider
    },
    {
      provide: MailService,
      useValue: mailService, // * value provider
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
  ],
})
export class UserModule {}
