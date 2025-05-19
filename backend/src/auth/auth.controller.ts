import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
// import { Roles } from '../decorators/roles.recorator';
// import { Role } from '../interfaces/role';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Get()
  hello() {
    return this.auth_service.hello();
  }

  @Post()
  create(@Body() createAuthDto: AuthDto) {
    return this.auth_service.register(createAuthDto);
  }
}
