import { Board, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { Injectable } from '@nestjs/common';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Injectable()
export class BoardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(authorName?: string): Promise<Board[]> {
    return this.prismaService.board.findMany({
      where: {
        author: {
          username: authorName ? authorName : undefined,
        },
      },
      include: {
        author: {
          select: {
            username: true,
            uuid: false,
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<Board> {
    return this.prismaService.board.findUnique({
      where: { id },
    });
  }

  async createBoard({ title, body }: CreateBoardDto, user: User) {
    return this.prismaService.board.create({
      data: { title, body, authorId: user.uuid },
    });
  }

  async updateBoard(id, { title, body }: UpdateBoardDto): Promise<Board> {
    return this.prismaService.board.update({
      where: { id },
      data: {
        title,
        body,
      },
    });
  }

  async deleteBoard(id: number): Promise<void> {
    this.prismaService.board.delete({
      where: {
        id,
      },
    });
  }
}
