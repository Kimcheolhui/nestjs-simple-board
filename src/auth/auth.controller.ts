import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './dto/authCredential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto);
  }
}
