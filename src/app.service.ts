import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users/users.service';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { SignInDto } from './auth/dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return this.generateToken(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Failed to create user');
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.validateUser(signInDto.email, signInDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  // Метод для Local стратегии
  async validateUserForLocal(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      return null;
    }
    return user;
  }

  private generateToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
      },
    };
  }

  async validateUser(payload: any) {
    return await this.userService.findOneById(payload.sub);
  }
}
