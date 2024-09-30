import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {
  createUserRepository,
  UserRepository,
} from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService, // * standard injection example
    {
      provide: Connection,
      // useClass:
      //   process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection, // * dynamic module injection / class provider
      useFactory: createConnection, // * dynamic module injection / factory provider
      inject: [ConfigService], // * what to inject
    },
    {
      provide: MailService,
      useValue: mailService, // * value provider
    },
    {
      provide: 'EmailService',
      useExisting: MailService, // * alias provider
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository, // * Factory provider
      inject: [Connection], // * what to inject
    },
    MemberService,
  ],
  // * exports: [UserService], // * export the service to be used in other modules
  exports: [UserService],
})
export class UserModule {}
