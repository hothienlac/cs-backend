import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';

import { UserService } from './user.service';
import { InterfaceModule } from '../../interface';
import { UserController } from './user.controller';

@Module({
  imports: [
      InterfaceModule,
      DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
