import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';

// import { UpdateBoardDto } from './dto/updateBoard.dto';
import { BoardService } from './board.service';
import { Board } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * 모든 게시글을 불러오기
   */
  @Get('/')
  async getAllBoards(@Query('author') authorName?: string): Promise<Board[]> {
    return this.boardService.getAllBoards(authorName);
  }

  @Get('/:id')
  async getBoard(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.getBoard(id);
  }

  /**
   * 게시글 작성
   */
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Request() req,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, req.user);
  }

  /**
   * 게시글 수정
   */
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Request() req,
  ): Promise<Board> {
    return this.boardService.updateBoard(id, updateBoardDto, req.user);
  }

  /**
   * 게시글 삭제
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, req.user);
  }
}
