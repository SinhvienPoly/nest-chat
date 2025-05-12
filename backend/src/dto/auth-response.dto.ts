import { Type } from 'class-transformer';

export class AuthReponseDto {
  @Type(() => Number)
  status_code: number;

  @Type(() => String || Array)
  message: string;

  @Type(() => Boolean)
  success: boolean;
}
