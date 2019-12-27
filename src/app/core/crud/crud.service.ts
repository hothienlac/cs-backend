// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Model, Document, ModelUpdateOptions } from 'mongoose';
import * as mongodb from 'mongodb';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ICrudService } from './icrud.service';
import { IPagination } from './pagination';

import { config } from '../../../config/config';
import * as bcrypt from 'bcrypt';

export abstract class CrudService<T extends Document> implements ICrudService<T> {

    saltRounds: number;

    protected constructor(protected readonly model: Model<T>) {
        this.saltRounds = config.USER_PASSWORD_BCRYPT_SALT_ROUNDS;
    }

    public async count(filter?): Promise<number> {
        return await this.model.countDocuments(filter).exec();
    }

    public async findAll(filter?): Promise<IPagination<T>> {
        const total = await this.model.count(filter).exec();
        const items = await this.model.find(filter).exec();
        return { items, total };
    }

    public async findOne( filter, options?): Promise<T> {
        const document = await this.model.findOne( filter, options).exec();
        if (!document) {
            throw new NotFoundException(`The requested document was not found`);
        }
        return document;
    }

    public async findOneByID(id, options?): Promise<T> {
        return this.findOne({ _id: id }, options);
    }

    public async create(entity: T, ...options: any[]): Promise<T> {
        return await this.model.create(entity);
    }

    async getPasswordHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    public async update( filter, doc, ...options: ModelUpdateOptions[]): Promise<boolean | T> {
        try {
            // method getPasswordHash is copied from AuthService
            // try if can import somehow the service and use its method

            if (doc.hash) {
                const hashPassword = await this.getPasswordHash(
                    doc.hash,
                );
                doc.hash = hashPassword;
            }

            return await this.model.update(filter, doc, options).exec();
        } catch (err /*: WriteError*/) {
            throw new BadRequestException(err);
        }
    }
    public async delete( conditions, ...options: any[] ): Promise<mongodb.DeleteWriteOpResultObject['result']> {
        try {
            return await this.model.deleteOne(conditions).exec();
        } catch (err) {
            throw new NotFoundException(`The record was not found`, err);
        }
    }

}
