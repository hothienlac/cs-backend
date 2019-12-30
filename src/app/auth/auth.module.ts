import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleService, Role } from '../role';
import { authenticate } from 'passport';

@Module({
  imports: [ CqrsModule],
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
