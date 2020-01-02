import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { InterfaceModule } from '../../interface';
import { DatabaseModule } from '../database';

@Module({
    imports: [
        InterfaceModule,
        DatabaseModule,
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule { }
