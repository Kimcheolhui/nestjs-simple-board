import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserCreateDto } from './dto/signUp.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) userCreateDto: UserCreateDto): Promise<void> {
    return this.userService.signUp(userCreateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
