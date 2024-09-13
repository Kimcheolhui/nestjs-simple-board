import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, PrismaService],
})
export class BoardModule {}
