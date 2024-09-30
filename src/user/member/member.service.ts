import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
  // * ModulRef is a reference to the module that contains the service, its not recommended because it breaks the dependency injection principle. If the modul is not available, the service will not work.
  constructor(private modulRef: ModuleRef) {}

  getConnectionName(): string {
    const connection = this.modulRef.get(Connection);
    return connection.getName();
  }

  sendEmail() {
    const mailService = this.modulRef.get(MailService);
    mailService.send();
  }
}
