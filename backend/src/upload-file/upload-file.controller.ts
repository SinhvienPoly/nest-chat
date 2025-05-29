import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { storageConfig } from '../config/storage.config';
import { VideoGuard } from '../video/video.guard';

@Controller('api/v1/upload')
export class UploadFileController {
  @UseGuards(VideoGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', { storage: storageConfig('images') }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.originalname);

    return file;
  }
}
