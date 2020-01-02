import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleService } from '../role';
import { authenticate } from 'passport';
import { InterfaceModule } from '../../interface';
import { DatabaseModule } from '../database';

@Module({
  imports: [
    CqrsModule,
    InterfaceModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    RoleService,
    ...CommandHandlers,
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authenticate('facebook', {
          session: false,
          scope: ['email'],
        }),
      )
      .forRoutes('auth/facebook/token');
  }
}
