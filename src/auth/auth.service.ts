import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { UserService } from 'src/user/users.service';
import { User } from 'src/shared/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ITokenBody } from 'src/shared/types/token.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return this.generateToken(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Не удалось создать пользователя');
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.validateUser(signInDto.email, signInDto.password);

    if (!user) {
      throw new UnauthorizedException('Нет пользователя с таким логином или неправильный пароль');
    }

    return this.generateToken(user);
  }

  private generateToken(user: Omit<User, 'password'>) {
    const payload: ITokenBody = {
      id: user.id,
      userUuid: user.userUuid,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.name,
        isActive: user.isActive,
      },
    };
  }
}
