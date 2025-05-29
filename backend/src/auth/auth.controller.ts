import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { Response as ResponseExpress } from 'express';

type LoginDto = { email: string; password: string };

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Get()
  hello() {
    return this.auth_service.hello();
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  create(@Body() createAuthDto: AuthDto) {
    return this.auth_service.register(createAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: ResponseExpress,
  ) {
    return this.auth_service.login(loginDto, response);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: AuthDto }): AuthDto {
    return req.user;
  }

  @Post('logout')
  logout(@Res() res: ResponseExpress) {
    return res.clearCookie('cookie').send({ message: 'Logged out' });
  }
}
