import { Module } from '@nestjs/common';

import { DatabaseProvider } from './database.provider';
import { RoleProvider } from './provider/role.provider';
import { UserProvider } from './provider/user.provider';
import { InterfaceModule } from '../../interface';

@Module({
    imports: [
        InterfaceModule,
    ],
    providers: [
        ...DatabaseProvider,
        ...RoleProvider,
        ...UserProvider,
    ],
    exports: [
        ...DatabaseProvider,
        ...RoleProvider,
        ...UserProvider,
    ],
})
export class DatabaseModule {}
