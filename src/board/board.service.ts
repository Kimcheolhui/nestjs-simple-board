import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Board, User } from '@prisma/client';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getAllBoards(authorName?: string): Promise<Board[]> {
    const foundBoard = await this.boardRepository.findMany(authorName);

    return foundBoard;
  }

  // Question: Board가 없을 경우, 그냥 빈 배열을 보내는 게 맞을까, Error를 주는 게 맞을까?

  async getAllMyBoards(user: User): Promise<Board[]> {
    const foundBoard = await this.boardRepository.findMany(
      undefined,
      user.uuid,
    );

    return foundBoard;
  }

  async getBoard(id: number): Promise<Board> {
    const foundBoard = await this.boardRepository.findOneById(id);

    if (!foundBoard) {
      throw new NotFoundException();
    }

    return foundBoard;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, body } = updateBoardDto;

    const board = await this.getBoard(id);

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found.`);
    }

    if (user.uuid !== board.authorId) {
      throw new UnauthorizedException();
    }

    if (title === undefined && body === undefined) {
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }

    return this.boardRepository.updateBoard(id, updateBoardDto);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const board = await this.getBoard(id);

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found.`);
    }

    if (user.uuid !== board.authorId) {
      throw new UnauthorizedException();
    }

    return this.boardRepository.deleteBoard(id);
  }
}
