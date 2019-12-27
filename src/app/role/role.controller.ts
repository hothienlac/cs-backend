import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CrudController } from '../core/crud/crud.controller';
import { IRole } from '../database';

@Controller()
export class RoleController extends CrudController<IRole> {
    constructor(private readonly roleService: RoleService) {
        super(roleService);
    }

    @Get()
    async findRole(@Query('data') data: string): Promise<IRole> {
        const { findInput } = JSON.parse(data);

        return this.roleService.findOne({ where: findInput });
    }
}
