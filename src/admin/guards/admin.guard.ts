// guards/admin.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/shared/constants/users.roles';
import { ITokenBody } from 'src/shared/types/token.type';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Токен не найден');
    }

    try {
      // Верифицируем токен
      const payload: ITokenBody = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET', 'defaultSecretKey'),
      });

      // Проверяем роль администратора
      const isAdmin = this.checkAdminRole(payload);

      if (!isAdmin) {
        throw new ForbiddenException(`Требуются права администратора`);
      }

      // Сохраняем пользователя в request
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Недействительный токен');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return undefined;
  }

  private checkAdminRole(payload: ITokenBody): boolean {
    // Проверяем разные варианты хранения роли
    return payload.role === UserRole.ADMIN;
  }
}
