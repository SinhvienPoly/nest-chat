import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Auth } from '../entity/auth.entity';
import { UserInterfaces } from '../interfaces/user.interfaces';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Auth) private users_repository: Repository<Auth>,
  ) {}

  async findOne(email: string): Promise<UserInterfaces | undefined> {
    const user = await this.users_repository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return undefined;
    }
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }
}
