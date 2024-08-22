import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Board } from './types/board.type';
import { CreateBoardDto } from './dto/createBoard.dto';

import { v1 as uuid } from 'uuid';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Controller('board')
export class BoardController {
  private boards: Board[] = [];

  /**
   * 모든 게시글을 불러오기
   * - TODO: query 적용할 수 있도록 수정
   * @returns
   */
  @Get('/')
  async getAllBoards(): Promise<Board[]> {
    return this.boards;
  }

  @Get('/:id')
  async getBoard(@Param('id') id: string): Promise<Board> {
    const board: Board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }

  /**
   * 게시글 작성
   */
  @Post('/')
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, body } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      body,
    };

    this.boards.push(board);

    return board;
  }

  /**
   * 게시글 수정
   */
  @Patch('/:id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    board.title = updateBoardDto.title ?? board.title;
    board.body = updateBoardDto.body ?? board.body;

    return board;
  }

  /**
   * 게시글 삭제
   */
  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    const newBoards = this.boards.filter((board) => board.id !== id);

    if (newBoards.length === this.boards.length) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    this.boards = newBoards;
  }
}
