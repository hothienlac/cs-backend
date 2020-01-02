// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Controller, HttpStatus, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CrudController } from '../core/crud/crud.controller';
import { UUIDValidationPipe } from '../shared';
import { IUser } from '../database';

@Controller()
export class UserController extends CrudController<IUser> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Get(':id')
  async findById(@Param('id', UUIDValidationPipe) id: string): Promise<IUser> {
    return this.userService.findOne(id);
  }

}
