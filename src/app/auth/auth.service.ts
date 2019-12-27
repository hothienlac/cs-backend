import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    hasRole(token: any, roles: string[]): boolean | PromiseLike<boolean> {
        throw new Error('Method not implemented.');
    }
}
