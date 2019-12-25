// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Role } from './role.model';
import { IBaseEntityModel } from './base-entity.model';

export interface IUser extends IBaseEntityModel {
  userName?: string;
  school?: string;
  major?: string;
  degree?: string;
  email?: string;
}


export interface IUserFindInput extends IBaseEntityModel {
  thirdPartyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: Role;
  roleId?: string;
  hash?: string;
  imageUrl?: string;
}

export interface IUserRegistrationInput {
	user: IUser;
	password?: string;
}
