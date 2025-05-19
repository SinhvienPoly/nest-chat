import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { Auth } from '../entity/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
