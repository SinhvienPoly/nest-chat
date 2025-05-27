import { Body, Controller, Get } from '@nestjs/common';

import { Roles } from '../decorators/roles.recorator';
import { Role } from '../interfaces/role.enum';
// import { VideoDto } from '../dto/video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  @Roles(Role.ADMIN)
  create() {
    this.videoService.create();
  }
}
