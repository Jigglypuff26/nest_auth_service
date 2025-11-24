import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email адрес, использованный при регистрации',
    example: 'user@example.com',
    format: 'email',
    required: true,
    type: String,
    maxLength: 64,
    examples: ['admin@example.com', 'test.user@domain.com'],
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль учетной записи (минимум 8 символов, максимум 128 символов)',
    example: 'mySecure$Password871!@',
    minLength: 8,
    maxLength: 128,
    required: true,
    type: String,
    format: 'password',
    writeOnly: true, // Скрывает пароль в ответах
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    examples: ['mySecure$Password871!@!'],
    externalDocs: {
      description: 'Learn more about strong passwords',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-password-strength-controls',
    },
  })
  @IsString()
  @MinLength(8, {
    message: 'Слишком маленький пароль (Пароль должен быть более 8 символов)',
  })
  @MaxLength(128, {
    message: 'Слишком большой пароль (Пароль должен быть менее 128 символов)',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Не надежный пароль для учетной запис',
  })
  password: string;
}
