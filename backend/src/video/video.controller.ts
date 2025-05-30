import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { VideoDto } from '../dto/video.dto';
import { VideoService } from './video.service';
import { VideoGuard } from './video.guard';
import { VideoDto } from 'src/dto/video.dto';
import { Request } from 'express';

@Controller('api/v1/video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @HttpCode(HttpStatus.OK)
  @Get('search')
  searchVideos(@Query() query: { q: string; page: number; limit: number }) {
    return this.videoService.searchVideos({
      q: query.q,
      page: query.page,
      limit: query.limit,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllVideos(@Query() query: { page: number; limit: number }) {
    return this.videoService.getAllVideos({
      page: query.page,
      limit: query.limit,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getVideoById(@Param() params: { id: number }) {
    const { id } = params;

    return this.videoService.getVideoById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(VideoGuard)
  create(@Body() body: VideoDto) {
    return this.videoService.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/update')
  @UseGuards(VideoGuard)
  update(@Param() params: { id: number }, @Body() body: VideoDto) {
    return this.videoService.update(params.id, body);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('deactive')
  @UseGuards(VideoGuard)
  deactiveVideos(@Body() body: { ids: number[]; active: boolean }) {
    return this.videoService.deActiveVideos(body);
  }
}
