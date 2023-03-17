import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(this.removePassword));
  }

  private removePassword(unknown: unknown): unknown {
    if (Array.isArray(unknown)) {
      return unknown.map(this.removePassword);
    }

    const isObject = typeof unknown === 'object';

    if (!isObject) {
      return unknown;
    }

    if (unknown === null) {
      return unknown;
    }

    const hasPassword = Object.keys(unknown).includes('password');

    if (hasPassword) {
      return {
        ...unknown,
        password: undefined,
      };
    }

    return unknown;
  }
}
