import { Body, Controller, Get, UseGuards } from '@nestjs/common';
// import { VideoDto } from '../dto/video.dto';
import { VideoService } from './video.service';
import { VideoGuard } from './video.guard';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  @UseGuards(VideoGuard)
  create() {
    return this.videoService.create();
  }
}
