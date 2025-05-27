import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class VideoDto {
  @IsNotEmpty({ message: 'Họ là bắt buộc' })
  @MinLength(6, { message: 'Tiêu đề tối thiểu 6 kí tự' })
  @Type(() => String)
  title: string;

  @IsNotEmpty({ message: 'Tên là bắt buộc' })
  @Type(() => String)
  description: string;

  @IsNotEmpty({ message: 'Email là bắt buộc' })
  @Type(() => String)
  thumbnail: string;
}
