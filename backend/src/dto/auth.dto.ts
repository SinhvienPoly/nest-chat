import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Họ là bắt buộc' })
  @Type(() => String)
  first_name: string;

  @IsNotEmpty({ message: 'Tên là bắt buộc' })
  @Type(() => String)
  last_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email là bắt buộc' })
  @Type(() => String)
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 kí tự' })
  @MaxLength(12, {
    message: 'Mật khẩu dài tối đa 12 kí tự',
  })
  @Type(() => String)
  password: string;
}
