import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';

import { UserService } from './user.service';

@Module({
  providers: [UserService ],
  imports : [DatabaseModule],
})
export class UserModule {}
