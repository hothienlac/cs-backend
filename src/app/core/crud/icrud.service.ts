// Code from https://github.com/xmlking/ngx-starter-kit. 
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import * as mongodb from 'mongodb';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination } from './pagination';
import { ModelUpdateOptions } from 'mongoose';

export interface ICrudService<T> {
  count(filter?): Promise<number>;
  findAll(filter?): Promise<IPagination<T>>;
  findOne(id, options?): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: any, entity: QueryDeepPartialEntity<T>, ...options: ModelUpdateOptions[]): Promise<boolean | T>;
  delete(id: any, ...options: any[]): Promise<mongodb.DeleteWriteOpResultObject['result']>;
}
