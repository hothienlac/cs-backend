import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import { UserService } from '../user';
import { IUser } from '../database';
import { CreateUserDTO } from '../database/';
import { config } from '../../config/config';
import { IUserRegistrationInput, IUserResetPasswordInput } from '../../interface';

@Injectable()
export class AuthService {
    saltRounds: number;

    constructor(private readonly userService: UserService) {
        this.saltRounds = config.USER_PASSWORD_BCRYPT_SALT_ROUNDS;
    }

    async getPasswordHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async login(
        email: string,
        password: string,
    ): Promise<{ user: IUser; token: string } | null> {
        const user = await this.userService.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.hash))) {
            return null;
        }

        const token = await this.createToken(user);

        delete user.hash;

        return {
            user,
            token,
        };
    }

    async requestPassword(
        email: string,
    ): Promise<{ id: string; token: string } | null> {
        const user = await this.userService.getUserByEmail(email);

        if (user && user.id) {
            const token = await this.createToken(user);

            if (token) {
                const url = `${config.host}:4200/auth/reset-password?token=${token}&id=${user.id}`;

                const testAccount = await nodemailer.createTestAccount();

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },
                });

                const info = await transporter.sendMail({
                    from: 'Gauzy',
                    to: user.email,
                    subject: 'Forgotten Password',
                    text: 'Forgot Password',
                    html:
                        'Hello! <br><br> We received a password change request.<br><br>If you requested to reset your password<br><br>' +
                        '<a href=' +
                        url +
                        '>Click here</a>',
                });

                // tslint:disable: no-console
                console.log('Message sent: %s', info.messageId);
                console.log(
                    'Preview URL: %s',
                    nodemailer.getTestMessageUrl(info),
                );

                return {
                    id: user.id,
                    token,
                };
            }
        } else {
            throw new Error('Email not found');
        }
    }

    async resetPassword(input: IUserResetPasswordInput) {
        if (input.password.length < 6) {
            throw new Error('Password should be at least 6 characters long');
        }

        if (input.password !== input.confirmPassword) {
            throw new Error('Passwords must match.');
        }

        if (!input.id) {
            throw new Error('User not found');
        }

        if (!input.token) {
            throw new Error('Authorization token is invalid or missing');
        }

        if (! (await this.isAuthenticated(input.token)) ) {
            throw new Error('Authorization token is invalid or missing');
        }

        const hash = await this.getPasswordHash(input.password);
        return this.userService.changePassword(input.id, hash);
    }

    async register(input: IUserRegistrationInput): Promise<CreateUserDTO> {
        input.user.role = 'USER';
        const user = this.userService.create({
            ...input.user,
            ...(input.password
                ? {
                        hash: await this.getPasswordHash(input.password),
                  }
                : {}),
        });

        return user;
    }

    async isAuthenticated(token: string): Promise<boolean> {
        try {
            const { id } = verify(token, config.JWT_SECRET) as {
                id: string;
            };

            let result: Promise<boolean>;

            result = this.userService.checkIfIDExists(id);

            return result;
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return false;
            } else {
                throw err;
            }
        }
    }

    async hasRole(token: string, roles: string[] = []): Promise<boolean> {
        try {
            const { id, role } = verify(token, config.JWT_SECRET) as {
                id: string;
                role: string;
            };
            return role ? roles.includes(role) : false;
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return false;
            } else {
                throw err;
            }
        }
    }

    async createToken(user: IUser): Promise<string> {
        const token: string = sign(
            { id: user.id, role: user.role },
            config.JWT_SECRET,
            {expiresIn: '30d'},
        );
        return token;
    }

}
