import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService, User } from '../user';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
