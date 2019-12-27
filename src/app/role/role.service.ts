import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { CrudService } from '../core/crud/crud.service';
import { IRole } from '../database';

@Injectable()
export class RoleService extends CrudService<IRole> {
  constructor(
    @Inject('USER_MODEL')
    private readonly roleModel: Model<IRole>,
  ) {
    super(roleModel);
  }
}
