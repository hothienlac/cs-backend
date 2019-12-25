// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import {
	Column,
	Entity,
	Index,
	ManyToOne,
	RelationId,
	JoinColumn
} from 'typeorm';
import {
	IsAscii,
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	IsOptional
} from 'class-validator';
import { Base } from '../core/entities/base';
import { User as IUser } from '@gauzy/models';
import { Role } from '../role';

@Entity('user')
export class User extends Base implements IUser {

	@IsString()
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	thirdPartyId?: string;


	@IsString()
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	firstName?: string;


	@IsString()
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	lastName?: string;


	@IsEmail()
	@IsNotEmpty()
	@Index({ unique: true })
	@IsOptional()
	@Column({ nullable: true })
	email?: string;


	@IsAscii()
	@MinLength(3)
	@MaxLength(20)
	@Index({ unique: true })
	@IsOptional()
	@Column({ nullable: true })
	username?: string;


	@ManyToOne((type) => Role, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	role?: Role;


	@RelationId((user: User) => user.role)
	@Column()
	roleId?: string;


	@IsString()
	@Column()
	@IsOptional()
	@Column({ nullable: true })
	hash?: string;


	@IsOptional()
	@Column({ length: 500, nullable: true })
	imageUrl?: string;
}
