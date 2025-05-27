import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { VideoController } from './video.controller';
import { VideoEntity } from '../entity/video.entity';
import { VideoService } from './video.service';
import { RolesGuard } from '../guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity]), ConfigModule.forRoot({})],
  providers: [
    VideoService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
  controllers: [VideoController],
  exports: [TypeOrmModule],
})
export class VideoModule {}
