import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dto/signUp.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) userCreateDto: UserCreateDto): Promise<void> {
    return this.userService.signUp(userCreateDto);
  }
}
