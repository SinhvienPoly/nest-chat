import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VideoEntity } from '../entity/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private video_repository: Repository<VideoEntity>,
  ) {}

  create() {
    return 'Create video';
  }

  uploadFile() {}
}
