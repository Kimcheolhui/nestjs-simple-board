import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto } from './dto/signUp.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userCreateDto: UserCreateDto): Promise<void> {
    const { username, password } = userCreateDto;

    /**
     * Q. 이미 존재하는 유저인지 확인하는 것을 service or repository에서 해야하는지?
     * service는 비즈니스 로직, repository는 db interaction이라고 알고 있는데
     * 그럼 중복 확인 과정은 비즈니스 로직으로 봐야할까?
     * auth module쪽에서도 findOneByUsername를 쓸 것 같아서 user service에도 findOneByUsername를 작성해두었다
     * 그럼 코드가 겹치는 느낌인데, 유저 중복 확인 과정을 service level로 올리면 해결된다.
     */
    const foundUser = await this.findOneByUsername(username);

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

  async findOneByUsername(username: string): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    return foundUser;
  }
}
