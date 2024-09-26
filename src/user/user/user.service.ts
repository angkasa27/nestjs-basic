import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // *Injection example
  sayHello(name: string): string {
    return `Hello ${name}!`;
  }
}
