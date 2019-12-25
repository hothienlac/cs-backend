// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ICrudService } from './icrud.service';
import { IPagination } from './pagination';

import { config } from '../../../config/config';
import * as bcrypt from 'bcrypt';


export abstract class CrudService<T> implements ICrudService<T> {
    saltRounds: number;

    protected constructor(protected readonly repository: Repository<T>) {
		this.saltRounds = env.USER_PASSWORD_BCRYPT_SALT_ROUNDS;
    }
    
    
}