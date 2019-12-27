
// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { ICrudService } from './icrud.service';
import { IPagination } from './pagination';
import { PaginationParams } from './pagination-params';

export abstract class CrudController<T> {
    protected constructor(private readonly crudService: ICrudService<T>) {}

    @Get()
    async findAll(filter?: PaginationParams<T>): Promise<IPagination<T>> {
        return this.crudService.findAll(filter);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<T> {
        return this.crudService.findOne({ _id: id });
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create( @Body() entity: T, ...options: any[] ): Promise<T> {
        return this.crudService.create(entity);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Put(':id')
    async update( @Param('id') id: string, @Body() entity, ...options: any[]): Promise<any> {
        return this.crudService.update({ _id: id }, entity);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Delete(':id')
    async delete(@Param('id') id: string, ...options: any[]): Promise<any> {
        return this.crudService.delete({ _id: id });
    }
}
