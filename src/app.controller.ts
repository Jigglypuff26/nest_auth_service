import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { SignInDto } from './auth/dto/signin.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { AuthService } from './app.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  // Альтернативный endpoint для signin без guard
  @Post('signin')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
