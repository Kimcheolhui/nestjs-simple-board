import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 전역 모듈 선언 -> 다른 모듈에서 imports에 추가할 필요 없어짐. 물론 루트 모듈에는 추가해줘야 한다고 함. // Q. ziggle-be에서는 전역모듈 처리를 안했던데, 왜 안했을까?
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
