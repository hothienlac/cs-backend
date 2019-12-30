import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import { UserService } from '../user';
import { IUser } from '../database';
import { CreateUserDTO } from '../database/';
import { config } from 'src/config/config';
import { IUserRegistrationInput } from 'src/interface';

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
        findObj: any,
        password: string,
    ): Promise<{ user: IUser; token: string } | null> {
        const user = await this.userService.findOne(findObj, {
            relations: ['role'],
        });

        if (!user || !(await bcrypt.compare(password, user.hash))) {
            return null;
        }

        const token = sign(
            { id: user.id, role: user.role ? user.role.role : '' },
            config.JWT_SECRET,
            {},
        ); // Never expires

        delete user.hash;

        return {
            user,
            token,
        };
    }

    async requestPassword(
        findObj: any,
    ): Promise<{ id: string; token: string } | null> {
        const user = await this.userService.findOne(findObj, {
            relations: ['role'],
        });

        let token: string;

        if (user && user.id) {
            const newToken = await this.createToken(user);
            token = newToken.token;

            if (token) {
                const url = `${config.host}:4200/#/auth/reset-password?token=${token}&id=${user.id}`;

                const testAccount = await nodemailer.createTestAccount();

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false, // true for 465, false for other ports
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

    async resetPassword(findObject) {
        if (findObject.password.length < 6) {
            throw new Error('Password should be at least 6 characters long');
        }

        if (findObject.password !== findObject.confirmPassword) {
            throw new Error('Passwords must match.');
        }

        if (!findObject.user.id) {
            throw new Error('User not found');
        }

        if (!findObject.user.token) {
            throw new Error('Authorization token is invalid or missing');
        }

        const hash = await this.getPasswordHash(findObject.password);
        return this.userService.changePassword(findObject.user.id, hash);
    }

    async register(input: IUserRegistrationInput): Promise<CreateUserDTO> {
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
            const { id, thirdPartyId } = verify(token, config.JWT_SECRET) as {
                id: string;
                thirdPartyId: string;
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

    async validateOAuthLoginEmail(
        emails: Array<{ value: string; verified: boolean }>,
    ): Promise<{
        success: boolean;
        authData: { jwt: string; userId: string };
    }> {
        let response = {
            success: false,
            authData: { jwt: null, userId: null },
        };

        try {
            for (const { value } of emails) {
                const userExist = await this.userService.checkIfExistsEmail(
                    value,
                );
                if (userExist) {
                    const user = await this.userService.getUserByEmail(value);
                    const userId = user.id;
                    const userRole = user.role ? user.role.role : '';
                    const payload = { id: userId, role: userRole };
                    const jwt: string = sign(payload, config.JWT_SECRET, {});
                    response = { success: true, authData: { jwt, userId } };
                }
            }
            return response;
        } catch (err) {
            throw new InternalServerErrorException(
                'validateOAuthLoginEmail',
                err.message,
            );
        }
    }

    async createToken(user: { id?: string }): Promise<{ token: string }> {
        const token: string = sign({ id: user.id }, config.JWT_SECRET, {});
        return { token };
    }

}
