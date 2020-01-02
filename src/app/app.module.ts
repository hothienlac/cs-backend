import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth';
import { CoreModule } from './core';
import { DatabaseModule } from './database';
import { RoleModule } from './role';
import { SharedModule } from './shared';
import { UserModule } from './user';

import { InterfaceModule } from '../interface';

@Module({
    imports: [
        RouterModule.forRoutes([
            {
                path: '',
                children: [
                    { path: '/auth', module: AuthModule },
                    { path: '/user', module: UserModule },
                  { path: '/role', module: RoleModule },

                ],
            },
        ]),
        AuthModule,
        CoreModule,
        DatabaseModule,
        RoleModule,
        SharedModule,
        UserModule,

        InterfaceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule {}
