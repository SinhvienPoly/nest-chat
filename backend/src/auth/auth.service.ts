import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

import { Auth } from '../entity/auth.entity';
import { AuthReponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private auth_repository: Repository<Auth>,
  ) {}

  hello() {
    return 'Hell';
  }

  async register(body: AuthDto): Promise<AuthReponseDto> {
    const hashed_password = await argon2.hash(body.password);

    const user = await this.auth_repository.save({
      ...body,
      password: hashed_password,
    });

    await this.auth_repository.save(user);

    return {
      status_code: 201,
      message: 'Đăng kí thành công',
      success: true,
    };
  }
}
