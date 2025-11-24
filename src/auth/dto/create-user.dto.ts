import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Уникальный email адрес пользователя',
    example: 'user@example.com',
    format: 'email',
    maxLength: 255,
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Надежный пароль для учетной записи',
    example: 'mySecurePassword',
    minLength: 8,
    required: true,
    type: String,
    format: 'password',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    examples: ['StrongPass1!', 'MyPassword123@', 'Secure2024!'],
    externalDocs: {
      description: 'Learn more about strong passwords',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-password-strength-controls',
    },
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
    },
  )
  password: string;

  @ApiPropertyOptional({
    description: 'Отображаемое имя пользователя (необязательное поле)',
    example: 'Александр Петров',
    maxLength: 100,
    nullable: true,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
