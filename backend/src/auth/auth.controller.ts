import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService) {}

  @Get()
  hello() {
    return this.auth_service.hello();
  }
}
