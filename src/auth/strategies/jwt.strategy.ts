import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/users.service';
import { ITokenBody } from 'src/shared/types/token.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'defaultSecretKey'),
    });
  }

  async validate(payload: ITokenBody) {
    const user = await this.userService.findOneById(payload.id);

    const validateUser = user?.id === payload.id && user?.userUuid === payload.userUuid;

    if (!user && !validateUser) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return user;
  }
}
