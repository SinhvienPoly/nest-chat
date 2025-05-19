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

  async sign_in(email: string) {
    const user = await this.auth_repository.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.password) {
      throw new Error('Invalid email or password');
    }

    // const verify_password = await argon2.verify(user.password, password);
  }
}
