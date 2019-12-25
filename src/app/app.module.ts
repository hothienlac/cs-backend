import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule, AuthService } from './auth';
import { UserModule, UserService, User } from './user';

@Module({
	imports: [
		RouterModule.forRoutes([
			{ks
				path: '',
				children: [
					{ path: '/auth', module: AuthModule },
					{ path: '/user', module: UserModule },
          { path: '/role', module: RoleModule },
          
				]
			}
    ]),
    
	],
	controllers: [AppController],
	providers: [AppService],
	exports: []
})
export class AppModule {}
