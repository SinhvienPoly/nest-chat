import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VideoEntity } from '../entity/video.entity';
import { VideoDto } from '../dto/video.dto';
import { VideoResponse } from '../interfaces/video-response.interfaces';

type VideoResponseProps = {
  message: string;
  status_code: number;
  success: boolean;
  video?: VideoEntity;
};

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private video_repository: Repository<VideoEntity>,
  ) {}

  async searchVideos(params: {
    q: string;
    page: number;
    limit: number;
  }): Promise<VideoEntity[]> {
    const { q, page = 1, limit = 20 } = params;

    const queryBuilder = this.video_repository.createQueryBuilder('video');

    queryBuilder.andWhere('video.title LIKE :title', {
      title: `%${q}%`,
    });

    queryBuilder.skip((page - 1) * limit).take(limit);

    // console.log(videos);

    return queryBuilder.getMany();
  }

  async getAllVideos(params: { page: number; limit: number }) {
    const { page = 1, limit = 20 } = params;

    const queryBuilder = this.video_repository.createQueryBuilder('video');

    queryBuilder.skip((page - 1) * limit).take(limit);

    // console.log(videos);

    return queryBuilder.getMany();
  }

  async getVideoById(id: number): Promise<VideoResponseProps | undefined> {
    console.log(id);

    const video = await this.video_repository.findOne({
      where: {
        id,
      },
    });

    if (!video) {
      return {
        message: 'Không tìm thấy video',
        status_code: 400,
        success: false,
        video: undefined,
      };
    }

    return {
      message: 'Tìm thấy video yêu cầu',
      status_code: 200,
      success: true,
      video,
    };
  }

  async create(body: VideoDto): Promise<VideoResponse> {
    const newVideo = this.video_repository.create(body);

    const result = await this.video_repository.save(newVideo);

    return {
      message: 'Tạo video thành công',
      status_code: 201,
      success: true,
      video: result,
    };
  }

  async update(id: number, body: VideoDto): Promise<VideoResponse | undefined> {
    const existingVideo = await this.video_repository.findOneBy({ id });

    const { title, description, thumbnail, video_url, tags } = body;

    if (!existingVideo) {
      return {
        message: 'Không tìm thấy video',
        status_code: 400,
        success: false,
        video: undefined,
      };
    }

    // Clean dto: loại bỏ chuỗi rỗng
    const cleanDto: Partial<VideoDto> = {
      ...(title?.trim() ? { title: title.trim() } : {}),
      ...(description?.trim() ? { description: description.trim() } : {}),
      ...(tags?.length
        ? { tags: tags.filter((tag) => tag.trim() !== '') }
        : {}),
    };

    // Gán các field thông thường
    Object.assign(existingVideo, cleanDto);

    if (thumbnail === undefined || thumbnail.trim() === '') {
      (existingVideo.thumbnail as any) = null;
    } else {
      existingVideo.thumbnail = thumbnail.trim();
    }

    if (video_url === undefined || video_url.trim() === '') {
      (existingVideo.video_url as any) = null;
    } else {
      existingVideo.video_url = video_url.trim();
    }

    const newVideo = await this.video_repository.save(existingVideo);

    return {
      message: 'Đã cập nhật video',
      status_code: 200,
      success: true,
      video: newVideo,
    };
  }

  async deActiveVideos(body: {
    ids: number[];
    active: boolean;
  }): Promise<VideoResponse | null> {
    const { ids, active } = body;

    if (ids.length === 0) {
      return null;
    }

    const videos: VideoEntity[] = await this.video_repository
      .createQueryBuilder('video')
      .where('video.id IN (:...ids)', { ids })
      .select('video.id')
      .getMany();

    const existingIds = Array.isArray(videos) ? videos.map((v) => v.id) : [];

    await this.video_repository
      .createQueryBuilder()
      .update(VideoEntity)
      .set({ is_active: active })
      .where('id IN (:...ids)', { ids: existingIds })
      .execute();

    return {
      message: 'Cập nhật thành công',
      status_code: 200,
      success: true,
      video: null,
    };
  }
}
