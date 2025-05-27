import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { Auth } from '../entity/auth.entity';
import { AuthReponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';
import { AuthResponseInterface } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private auth_repository: Repository<Auth>,
    private jwt_service: JwtService,
  ) {}

  hello() {
    return 'Hellworld';
  }

  async register(body: AuthDto): Promise<AuthReponseDto> {
    const existing_email = await this.auth_repository.findOne({
      where: {
        email: body.email,
      },
    });

    if (existing_email) {
      return {
        status_code: 400,
        message: 'Email đã tồn tại',
        success: false,
      };
    }

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

  async login(email: string, password: string): Promise<AuthResponseInterface> {
    const user = await this.auth_repository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Người dùng không tồn tại',
        status_code: 403,
      };
    }

    const verify_password = await argon2.verify(user.password, password);

    if (!verify_password) {
      return {
        status_code: 403,
        message: 'Mật khẩu không đúng',
        success: false,
      };
    }

    const payload = { sub: user.id, email: user.email };

    return {
      message: 'Đăng nhập thành công',
      success: true,
      status_code: 201,
      access_token: await this.jwt_service.signAsync(payload),
    };
  }
}
