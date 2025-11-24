import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email адрес, использованный при регистрации',
    example: 'user@example.com',
    format: 'email',
    required: true,
    type: String,
    maxLength: 255,
    examples: ['admin@example.com', 'test.user@domain.com'],
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль учетной записи (минимум 8 символов)',
    example: 'mySecurePassword',
    minLength: 8,
    required: true,
    type: String,
    format: 'password',
    writeOnly: true, // Скрывает пароль в ответах
  })
  @IsString()
  @MinLength(8)
  password: string;
}
