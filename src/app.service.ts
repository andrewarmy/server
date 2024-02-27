import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name: string): string {
    return `Hi ${name[0].toUpperCase()}${name.slice(1)}`
  }
}
