import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Không được bỏ trống' })
  @MinLength(2, { message: 'Tiêu đề tối thiểu 2 ký tự' })
  @Type(() => String)
  title: string;

  @IsBoolean()
  @Type(() => Boolean)
  is_active: boolean;
}
