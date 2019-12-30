import { IRole } from 'src/interface';

export class CreateUserDTO {
    readonly email?: string;
    readonly userName?: string;
    readonly hash?: string;

    readonly firstName?: string;
    readonly lastName?: string;
    readonly school?: string;
    readonly major?: string;
    readonly degree?: string;
    readonly username?: string;
    readonly role?: IRole;
    readonly roleId?: string;
    readonly imageUrl?: string;

    readonly password?: string;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}