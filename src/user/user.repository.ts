import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto } from './dto/userCredential.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userCreateDto: UserCreateDto): Promise<void> {
    const { username, password } = userCreateDto;

    const foundUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (foundUser) {
      throw new ConflictException('username already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        username,
        password,
      },
    });

    if (!user) {
      throw new InternalServerErrorException('failed to signup');
    }
  }
}
