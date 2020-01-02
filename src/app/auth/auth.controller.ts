import {
    Controller,
    Post,
    HttpStatus,
    HttpCode,
    Body,
    Get,
    Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../database';
import { AuthRegisterCommand } from './commands';
import { RequestContext } from '../core/context';
import { IUserRegistrationInput, IUserResetPasswordInput } from '../../interface';
import { getUserDummyImage } from '../core';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get('/authenticated')
    async authenticated(): Promise<boolean> {
        console.log('authenticate');
        const token = RequestContext.currentToken();
        return this.authService.isAuthenticated(token);
    }

    @Get('/role')
    async hasRole(@Query('roles') roles: string[]): Promise<boolean> {
        const token = RequestContext.currentToken();
        return this.authService.hasRole(token, roles);
    }

    @Post('/register')
    async create(
        @Body() entity: IUserRegistrationInput,
        ...options: any[]
    ): Promise<any> {
        if (!entity.user.imageUrl) {
            entity.user.imageUrl = getUserDummyImage(entity.user);
        }
        return this.authService.register(entity);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(
        @Body() { email, password },
        ...options: any[]
    ): Promise<{ user: IUser; token: string } | null> {
        return this.authService.login(email, password);
    }

    @Post('/reset-password')
    async resetPassword(@Body() input: IUserResetPasswordInput, ...options: any[]) {
        return await this.authService.resetPassword(input);
    }

    @Post('/request-password')
    async requestPass(
        @Body() { email },
        ...options: any[]
    ): Promise<{ id: string; token: string } | null> {
        return await this.authService.requestPassword(email);
    }

}
