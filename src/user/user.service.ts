import { Injectable } from '@nestjs/common';

import { UserCreateDto } from './dto/userCredential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userCreateDto: UserCreateDto): Promise<void> {
    return this.userRepository.createUser(userCreateDto);
  }
}
