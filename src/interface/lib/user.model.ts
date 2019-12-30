// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { IRole } from './role.model';
import { IBaseEntityModel } from './base-entity.model';

export interface IUser extends IBaseEntityModel {
  email?: string;
  userName?: string;
  hash?: string;

  firstName?: string;
  lastName?: string;
  school?: string;
  major?: string;
  degree?: string;
  username?: string;
  role?: IRole;
  roleId?: string;
  imageUrl?: string;
}

export interface IUserFindInput extends IBaseEntityModel {
  thirdPartyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: IRole;
  roleId?: string;
  hash?: string;
  imageUrl?: string;
}

export interface IUserRegistrationInput {
  user: IUser;
  password?: string;
}
