import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class VideoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề là bắt buộc' })
  @MinLength(6, { message: 'Tiêu đề tối thiểu 6 kí tự' })
  @Type(() => String)
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả là bắt buộc' })
  @Type(() => String)
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Giá trị phải là định dạng string' })
  @ArrayMinSize(1, { message: 'Tối thiểu 1 tagname' })
  @Type(() => Array)
  tags: string[];

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  video_url?: string;
}
