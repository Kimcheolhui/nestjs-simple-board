import { Injectable } from '@nestjs/common';

import { UserCreateDto } from './dto/signUp.dto';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userCreateDto: UserCreateDto): Promise<void> {
    const { password } = userCreateDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.createUser({
      ...userCreateDto,
      password: hashedPassword,
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneByUsername(username);
  }
}
