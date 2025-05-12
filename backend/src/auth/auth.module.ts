import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/entity/auth.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {}
