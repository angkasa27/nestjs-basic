import { Injectable } from '@nestjs/common';

// ** generated from  nest generate service [name] [path folder]

@Injectable()
export class UserService {
  // *Injection example
  sayHello(name: string): string {
    return `Hello ${name}!`;
  }
}
